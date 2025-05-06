/**
 * Counts the number of words in a string
 * @param {string} text - The text to count words in
 * @returns {number} - The number of words
 */
export const countWords = (text) => {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

/**
 * Determines the appropriate color class based on input length with theme support
 * @param {number} length - The character length of the input
 * @param {string} theme - Optional theme parameter ('light' or 'dark')
 * @returns {Object} - Object containing background, text, border, progress color classes and percentage
 */
export const getPromptColor = (length, theme = null) => {
  // Define color sets for both light and dark themes
  const colorSets = {
    green: {
      light: {
        background: 'bg-green-100',
        text: 'text-green-800',
        border: 'border-green-300',
        progress: 'bg-green-500'
      },
      dark: {
        background: 'bg-green-800',
        text: 'text-green-100',
        border: 'border-green-700',
        progress: 'bg-green-400'
      }
    },
    yellow: {
      light: {
        background: 'bg-yellow-100',
        text: 'text-yellow-800',
        border: 'border-yellow-300',
        progress: 'bg-yellow-500'
      },
      dark: {
        background: 'bg-yellow-800',
        text: 'text-yellow-100',
        border: 'border-yellow-700',
        progress: 'bg-yellow-400'
      }
    },
    red: {
      light: {
        background: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-300',
        progress: 'bg-red-500'
      },
      dark: {
        background: 'bg-red-800',
        text: 'text-red-100',
        border: 'border-red-700',
        progress: 'bg-red-400'
      }
    },
    purple: {
      light: {
        background: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-300',
        progress: 'bg-purple-500'
      },
      dark: {
        background: 'bg-purple-800',
        text: 'text-purple-100',
        border: 'border-purple-700',
        progress: 'bg-purple-400'
      }
    }
  };

  // Determine color set based on length
  let colorSet;
  let percent;

  if (length <= 50) {
    colorSet = colorSets.green;
    percent = Math.min(100, (length / 50) * 100);
  } else if (length <= 150) {
    colorSet = colorSets.yellow;
    percent = Math.min(100, ((length - 50) / 100) * 100);
  } else if (length <= 300) {
    colorSet = colorSets.red;
    percent = Math.min(100, ((length - 150) / 150) * 100);
  } else {
    colorSet = colorSets.purple;
    percent = 100;
  }

  // If theme is specified, return only that theme's colors
  if (theme === 'light') {
    return {
      ...colorSet.light,
      percent
    };
  } else if (theme === 'dark') {
    return {
      ...colorSet.dark,
      percent
    };
  }

  // Otherwise return responsive classes for both themes
  return {
    background: `${colorSet.light.background} dark:${colorSet.dark.background}`,
    text: `${colorSet.light.text} dark:${colorSet.dark.text}`,
    border: `${colorSet.light.border} dark:${colorSet.dark.border}`,
    progress: `${colorSet.light.progress} dark:${colorSet.dark.progress}`,
    percent
  };
};
