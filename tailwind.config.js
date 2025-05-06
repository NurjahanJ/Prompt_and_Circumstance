/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chatgpt-gray': '#f7f7f8',
        'chatgpt-blue': '#10a37f',
        'user-message': '#f7f7f8',
        'assistant-message': '#ffffff',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'color-transition': 'colorTransition 0.5s ease-in-out',
        'progress-grow': 'progressGrow 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        colorTransition: {
          '0%': { backgroundColor: 'var(--color-from)' },
          '100%': { backgroundColor: 'var(--color-to)' },
        },
        progressGrow: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      transitionProperty: {
        'background': 'background-color',
        'width': 'width',
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
