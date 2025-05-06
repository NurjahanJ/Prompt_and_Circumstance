import React, { useMemo } from 'react';

/**
 * Get color classes based on message length
 * @param {number} length - The character length of the message
 * @returns {Object} - Object containing background and text color classes
 */
const getMessageColors = (length) => {
  if (length <= 50) {
    return {
      background: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300'
    };
  } else if (length <= 150) {
    return {
      background: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300'
    };
  } else if (length <= 300) {
    return {
      background: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300'
    };
  } else {
    return {
      background: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-300'
    };
  }
};

const Message = ({ message }) => {
  const isUser = message.sender === 'user';
  
  // Get color classes based on message length
  const colorClasses = useMemo(() => {
    if (isUser) {
      return getMessageColors(message.text.length);
    }
    return { background: 'bg-white', text: 'text-gray-800' };
  }, [isUser, message.text.length]);
  
  return (
    <div 
      className={`animate-fade-in flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div 
        className={`max-w-[80%] md:max-w-[70%] rounded-lg p-4 shadow-sm animate-fade-in transition-colors duration-500 ease-in-out ${
          isUser 
            ? `${colorClasses.background} ${colorClasses.text} rounded-br-none` 
            : 'bg-white text-gray-800 rounded-bl-none'
        }`}
      >
        <div className="flex items-start">
          {!isUser && (
            <div className="mr-3 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm md:text-base whitespace-pre-wrap transition-colors duration-500 ease-in-out">{message.text}</p>
          </div>
          {isUser && (
            <div className="ml-3 flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="mt-1 text-xs text-right opacity-70">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default Message;
