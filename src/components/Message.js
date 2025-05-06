import React, { useMemo } from 'react';

/**
 * Get color classes based on message length with dark mode support
 * @param {number} length - The character length of the message
 * @returns {Object} - Object containing background and text color classes for both light and dark modes
 */
const getMessageColors = (length) => {
  if (length <= 50) {
    return { 
      background: 'bg-green-100 dark:bg-green-800', 
      text: 'text-green-800 dark:text-green-100' 
    };
  } else if (length <= 150) {
    return { 
      background: 'bg-yellow-100 dark:bg-yellow-800', 
      text: 'text-yellow-800 dark:text-yellow-100' 
    };
  } else if (length <= 300) {
    return { 
      background: 'bg-red-100 dark:bg-red-800', 
      text: 'text-red-800 dark:text-red-100' 
    };
  } else {
    return { 
      background: 'bg-purple-100 dark:bg-purple-800', 
      text: 'text-purple-800 dark:text-purple-100' 
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
    return { 
      background: 'bg-gray-200 dark:bg-gray-700', 
      text: 'text-gray-800 dark:text-gray-200'
    };
  }, [isUser, message.text.length]);
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in transition-colors duration-300`}>
      <div className="flex items-end space-x-2 max-w-[90%]">
        {!isUser && (
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z" />
              </svg>
            </div>
          </div>
        )}
        
        <div 
          className={`max-w-[calc(100%-40px)] break-words rounded-2xl py-3 px-4 ${isUser 
            ? `${colorClasses.background} ${colorClasses.text} transition-colors duration-500` 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors duration-300'}`}
        >
          <p className="text-sm md:text-base break-words overflow-hidden">{message.text}</p>
          <div className="mt-1 text-xs text-right opacity-70 dark:text-gray-300">
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
        
        {isUser && (
          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
            <div className="w-full h-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white font-bold transition-colors duration-300">
              U
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
