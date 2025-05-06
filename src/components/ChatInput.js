import React, { useState, useRef, useEffect } from 'react';
import { getPromptColor, countWords } from '../utils/colorUtils';
import { useTheme } from '../contexts/ThemeContext';

const ChatInput = ({ onSendMessage, disabled, onInputChange }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);
  const [colorClasses, setColorClasses] = useState(getPromptColor(0));
  const [wordCount, setWordCount] = useState(0);
  const { darkMode } = useTheme();

  // Auto-resize the textarea based on content and update color classes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    
    // Update color classes based on message length and notify parent component
    setColorClasses(getPromptColor(message.length));
    setWordCount(countWords(message));
    
    // Notify parent component about input change for background color
    if (onInputChange) {
      onInputChange(message);
    }
  }, [message, onInputChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-colors duration-300">
      <form 
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto relative"
      >
        <div className="relative flex items-center transition-background duration-500 ease-in-out rounded-lg p-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message ChatGPT..."
            className={`auto-resize-textarea w-full ${colorClasses.background} border ${colorClasses.border} rounded-lg py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-chatgpt-blue focus:border-transparent transition-all duration-500 ease-in-out dark:text-gray-100`}
            rows={1}
            disabled={disabled}
            aria-label="Chat message input"
            style={{ color: message.length > 0 ? 'inherit' : '#6B7280' }}
          />
          <button
            type="submit"
            className={`absolute right-3 p-1 rounded-md ${
              message.trim() && !disabled
                ? `${colorClasses.text} hover:bg-gray-100`
                : 'text-gray-400 cursor-not-allowed'
            }`}
            disabled={!message.trim() || disabled}
            aria-label="Send message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
        
        {/* Progress bar */}
        <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden transition-colors duration-300">
          <div 
            className={`h-full ${colorClasses.progress} transition-width duration-300 ease-in-out animate-progress-grow rounded-full`}
            style={{ width: `${colorClasses.percent}%` }}
          ></div>
        </div>
        
        {/* Character and word count indicators */}
        <div className="flex justify-between mt-1">
          <div className={`text-xs ${colorClasses.text}`}>
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </div>
          <div className={`text-xs ${colorClasses.text}`}>
            {message.length} {message.length === 1 ? 'character' : 'characters'}
          </div>
        </div>
        <p className="text-xs text-center mt-3 text-gray-500 dark:text-gray-400 transition-colors duration-300">
          ChatGPT can make mistakes. Consider checking important information.
        </p>
      </form>
    </div>
  );
};

export default ChatInput;
