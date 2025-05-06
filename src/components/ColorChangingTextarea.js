import React, { useState, useEffect, useRef } from 'react';

/**
 * Get color classes and progress percentage based on input length with dark mode support
 * @param {number} length - The character length of the input
 * @returns {Object} - Object containing background, text, progress color classes and percentage for both light and dark modes
 */
const getPromptColor = (length) => {
  if (length <= 50) {
    return {
      background: 'bg-green-100 dark:bg-green-800',
      text: 'text-green-800 dark:text-green-100',
      border: 'border-green-300 dark:border-green-700',
      progress: 'bg-green-500 dark:bg-green-400',
      percent: Math.min(100, (length / 50) * 100)
    };
  } else if (length <= 150) {
    return {
      background: 'bg-yellow-100 dark:bg-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-100',
      border: 'border-yellow-300 dark:border-yellow-700',
      progress: 'bg-yellow-500 dark:bg-yellow-400',
      percent: Math.min(100, ((length - 50) / 100) * 100)
    };
  } else if (length <= 300) {
    return {
      background: 'bg-red-100 dark:bg-red-800',
      text: 'text-red-800 dark:text-red-100',
      border: 'border-red-300 dark:border-red-700',
      progress: 'bg-red-500 dark:bg-red-400',
      percent: Math.min(100, ((length - 150) / 150) * 100)
    };
  } else {
    return {
      background: 'bg-purple-100 dark:bg-purple-800',
      text: 'text-purple-800 dark:text-purple-100',
      border: 'border-purple-300 dark:border-purple-700',
      progress: 'bg-purple-500 dark:bg-purple-400',
      percent: 100
    };
  }
};

/**
 * A textarea component that changes background color based on character count
 * @param {Object} props - Component props
 * @param {string} props.value - The value of the textarea
 * @param {function} props.onChange - Function to call when the value changes
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.disabled - Whether the textarea is disabled
 * @param {string} props.className - Additional classes to apply
 * @returns {JSX.Element} - Rendered component
 */
const ColorChangingTextarea = ({ 
  value, 
  onChange, 
  placeholder = "Type something...", 
  disabled = false,
  className = "",
  ...props 
}) => {
  const [colorClasses, setColorClasses] = useState(getPromptColor(0));
  const textareaRef = useRef(null);

  // Update color classes based on character count
  useEffect(() => {
    setColorClasses(getPromptColor(value.length));

    // Auto-resize the textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="relative w-full transition-colors duration-300">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full p-3 border ${colorClasses.border} rounded-lg resize-none overflow-hidden transition-all duration-500 ease-in-out ${colorClasses.background} ${className}`}
        rows={1}
        {...props}
      />
      
      {/* Progress bar */}
      <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden transition-colors duration-300">
        <div 
          className={`h-full ${colorClasses.progress} transition-width duration-300 ease-in-out rounded-full`}
          style={{ width: `${colorClasses.percent}%` }}
        ></div>
      </div>
      
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right transition-colors duration-300">
        {value.length} characters
      </div>
      
      <div className="flex justify-between mt-1">
        <div className={`text-xs ${colorClasses.text}`}>
          {Math.round(colorClasses.percent)}%
        </div>
        <div className={`text-xs ${colorClasses.text}`}>
          {value.length} characters
        </div>
      </div>
    </div>
  );
};

export default ColorChangingTextarea;
