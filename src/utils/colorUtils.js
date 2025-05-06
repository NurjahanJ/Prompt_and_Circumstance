/**
 * Counts the number of words in a string
 * @param {string} text - The text to count words in
 * @returns {number} - The number of words
 */
export const countWords = (text) => {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

/**
 * Determines the appropriate color class based on input length with dark mode support
 * @param {number} length - The character length of the input
 * @returns {Object} - Object containing background, text, and progress bar color classes for both light and dark modes
 */
export const getPromptColor = (length) => {
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
