import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './contexts/ThemeContext';
import { getPromptColor } from './utils/colorUtils';
import { sendMessageToOpenAI, formatConversationForOpenAI } from './utils/openaiService';
import Header from './components/Header';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import ColorChangingTextareaExample from './components/ColorChangingTextareaExample';

function App() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentInput, setCurrentInput] = useState('');
  const messagesEndRef = useRef(null);
  const { darkMode } = useTheme();
  
  // Determine the background color based on input length and dark mode
  let backgroundColorClass;
  
  if (currentInput.length === 0) {
    // Default background when there's no input
    backgroundColorClass = darkMode ? 'bg-gray-900' : 'bg-white';
  } else if (currentInput.length <= 50) {
    // Green background (0-50 chars)
    backgroundColorClass = darkMode ? 'bg-green-800' : 'bg-green-100';
  } else if (currentInput.length <= 150) {
    // Yellow background (51-150 chars)
    backgroundColorClass = darkMode ? 'bg-yellow-800' : 'bg-yellow-100';
  } else if (currentInput.length <= 300) {
    // Red background (151-300 chars)
    backgroundColorClass = darkMode ? 'bg-red-800' : 'bg-red-100';
  } else {
    // Purple background (301+ chars)
    backgroundColorClass = darkMode ? 'bg-purple-800' : 'bg-purple-100';
  }

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Apply background color to body element directly
  useEffect(() => {
    document.body.className = backgroundColorClass + ' transition-all duration-500 ease-in-out';
    
    // Cleanup function to reset body class when component unmounts
    return () => {
      document.body.className = '';
    };
  }, [backgroundColorClass]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Function to handle sending a new message
  const handleSendMessage = async (message) => {
    if (!message.trim()) return;
    
    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
    
    // Update messages with user message
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);
    
    try {
      // Check if OpenAI API is configured
      if (!process.env.REACT_APP_OPENAI_API_KEY) {
        // Fall back to mock response if API key is not available
        setTimeout(() => {
          const mockResponse = getMockResponse();
          const assistantMessage = {
            id: Date.now() + 1,
            text: mockResponse,
            sender: 'assistant',
            timestamp: new Date().toISOString(),
          };
          
          setMessages(prevMessages => [...prevMessages, assistantMessage]);
          setLoading(false);
        }, 1000);
        return;
      }
      
      // Format conversation history for OpenAI API
      const formattedMessages = formatConversationForOpenAI(updatedMessages);
      
      // Send to OpenAI API
      const response = await sendMessageToOpenAI(formattedMessages);
      
      // Create assistant message with API response
      const assistantMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      // Update messages with assistant response
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      // Handle error - add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: `Sorry, there was an error: ${error.message}`,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
        isError: true
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      console.error('Error getting response from OpenAI:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mock function to generate assistant responses when API is not available
  const getMockResponse = () => {
    const responses = [
      "I'm an AI assistant, how can I help you today?",
      "That's an interesting question. Let me think about that...",
      "I'm here to assist with any questions you might have.",
      "I understand your question. Here's what I know about that topic...",
      "Thanks for asking! I'd be happy to help with that.",
    ];
    
    // For demo purposes, just return a random response
    return responses[Math.floor(Math.random() * responses.length)];
  };

  // Toggle between chat interface and textarea example
  const [showExample, setShowExample] = useState(false);

  // Apply the background color to the entire app
  return (
    <div className={`flex flex-col h-screen ${backgroundColorClass} transition-all duration-500 ease-in-out`}>
      <Header />
      <div className="py-2 px-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <button 
          onClick={() => setShowExample(!showExample)}
          className="px-4 py-2 bg-chatgpt-blue dark:bg-blue-600 text-white rounded-md hover:bg-opacity-90 transition-all"
        >
          {showExample ? 'Show Chat Interface' : 'Show Textarea Example'}
        </button>
      </div>
      {showExample ? (
        <main className="flex-1 overflow-auto transition-colors duration-300">
          <ColorChangingTextareaExample />
        </main>
      ) : (
        <main className="flex-1 overflow-hidden flex flex-col max-w-5xl mx-auto w-full transition-colors duration-300">
          <ChatHistory 
            messages={messages} 
            loading={loading} 
            messagesEndRef={messagesEndRef} 
          />
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={loading} 
            onInputChange={setCurrentInput}
          />
        </main>
      )}
    </div>
  );
}

export default App;
