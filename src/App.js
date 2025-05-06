import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from './contexts/ThemeContext';
import { getPromptColor } from './utils/colorUtils';
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
  
  // Get background color based on input length, but use default when there's no input
  const backgroundColorClass = currentInput.length > 0 
    ? getPromptColor(currentInput.length).background 
    : 'bg-white dark:bg-gray-900';

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setLoading(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      // Mock response from assistant
      const response = getAssistantResponse(message);
      const assistantMessage = {
        id: Date.now() + 1,
        text: response,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  // Mock function to generate assistant responses
  const getAssistantResponse = (message) => {
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

  return (
    <div className={`flex flex-col h-screen ${backgroundColorClass} transition-all duration-500 ease-in-out`}>
      <Header />
      <div className="bg-white dark:bg-gray-800 py-2 px-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <button 
          onClick={() => setShowExample(!showExample)}
          className="px-4 py-2 bg-chatgpt-blue dark:bg-blue-600 text-white rounded-md hover:bg-opacity-90 transition-all"
        >
          {showExample ? 'Show Chat Interface' : 'Show Textarea Example'}
        </button>
      </div>
      {showExample ? (
        <main className="flex-1 overflow-auto dark:bg-gray-900 transition-colors duration-300">
          <ColorChangingTextareaExample />
        </main>
      ) : (
        <main className="flex-1 overflow-hidden flex flex-col max-w-5xl mx-auto w-full dark:bg-gray-900 transition-colors duration-300">
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
