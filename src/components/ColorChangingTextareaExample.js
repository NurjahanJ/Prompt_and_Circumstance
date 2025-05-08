import React, { useState, useEffect } from 'react';
import ColorChangingTextarea from './ColorChangingTextarea';
import { getPromptColor } from '../utils/colorUtils';
import { useTheme } from '../contexts/ThemeContext';

const ColorChangingTextareaExample = () => {
  const [value, setValue] = useState('');
  const { darkMode } = useTheme();
  const [backgroundClass, setBackgroundClass] = useState(
    darkMode ? 'bg-gray-900' : 'bg-white'
  );
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  // Update background color based on input length
  useEffect(() => {
    // Determine background color based on input length and dark mode
    if (value.length === 0) {
      // Default background when there's no input
      setBackgroundClass(darkMode ? 'bg-gray-900' : 'bg-white');
    } else if (value.length <= 50) {
      // Green background (0-50 chars)
      setBackgroundClass(darkMode ? 'bg-green-800' : 'bg-green-100');
    } else if (value.length <= 150) {
      // Yellow background (51-150 chars)
      setBackgroundClass(darkMode ? 'bg-yellow-800' : 'bg-yellow-100');
    } else if (value.length <= 300) {
      // Red background (151-300 chars)
      setBackgroundClass(darkMode ? 'bg-red-800' : 'bg-red-100');
    } else {
      // Purple background (301+ chars)
      setBackgroundClass(darkMode ? 'bg-purple-800' : 'bg-purple-100');
    }
  }, [value, darkMode]);

  return (
    <div className={`max-w-2xl mx-auto p-6 ${backgroundClass} transition-all duration-500 ease-in-out`}>
      <h1 className="text-2xl font-bold mb-4 dark:text-white">Color Changing Textarea</h1>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        This textarea changes background color based on character count and includes a progress bar:
        <span className="block mt-1 text-sm">
          <span className="inline-block px-2 py-1 bg-green-100 rounded mr-2">0-50 chars <span className="inline-block w-3 h-3 ml-1 bg-green-500 rounded-full"></span></span>
          <span className="inline-block px-2 py-1 bg-yellow-100 rounded mr-2">51-150 chars <span className="inline-block w-3 h-3 ml-1 bg-yellow-500 rounded-full"></span></span>
          <span className="inline-block px-2 py-1 bg-red-100 rounded mr-2">151-300 chars <span className="inline-block w-3 h-3 ml-1 bg-red-500 rounded-full"></span></span>
          <span className="inline-block px-2 py-1 bg-purple-100 rounded">301+ chars <span className="inline-block w-3 h-3 ml-1 bg-purple-500 rounded-full"></span></span>
        </span>
      </p>
      
      <div className="my-6">
        <ColorChangingTextarea
          value={value}
          onChange={handleChange}
          placeholder="Start typing to see the background color change..."
          aria-label="Color changing textarea example"
        />
      </div>
      
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg transition-colors duration-300">
        <h2 className="text-lg font-semibold mb-2 dark:text-white">Features:</h2>
        <ul className="list-disc pl-5 mb-4 text-gray-700 dark:text-gray-300">
          <li>Background color changes based on character count</li>
          <li>Border color matches the background theme</li>
          <li>Progress bar shows percentage within current threshold</li>
          <li>Smooth animations with configurable durations</li>
          <li>Auto-resizing textarea grows with content</li>
        </ul>
        
        <h2 className="text-lg font-semibold mb-2 mt-4 dark:text-white">How to use this component:</h2>
        <pre className="bg-gray-800 text-white p-4 rounded overflow-x-auto text-sm">
{`import { ColorChangingTextarea } from './components';

const MyComponent = () => {
  const [text, setText] = useState('');

  return (
    <ColorChangingTextarea
      value={text}
      onChange={(e) => setText(e.target.value)}
      placeholder="Type something..."
    />
  );
};`}
        </pre>
      </div>
    </div>
  );
};

export default ColorChangingTextareaExample;
