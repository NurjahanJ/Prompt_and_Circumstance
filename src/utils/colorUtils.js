/**
 * Counts the number of words in a string
 * @param {string} text - The text to count words in
 * @returns {number} - The number of words
 */
export const countWords = (text) => {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

/**
 * Determines the appropriate color class based on input length
 * @param {number} length - The character length of the input
 * @returns {Object} - Object containing background, text, and progress bar color classes
 */
export const getPromptColor = (length) => {
  if (length <= 50) {
    return {
      background: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-300',
      progress: 'bg-green-500',
      percent: Math.min(100, (length / 50) * 100)
    };
  } else if (length <= 150) {
    return {
      background: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-300',
      progress: 'bg-yellow-500',
      percent: Math.min(100, ((length - 50) / 100) * 100)
    };
  } else if (length <= 300) {
    return {
      background: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-300',
      progress: 'bg-red-500',
      percent: Math.min(100, ((length - 150) / 150) * 100)
    };
  } else {
    return {
      background: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-300',
      progress: 'bg-purple-500',
      percent: 100
    };
  }
};
