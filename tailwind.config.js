/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',
      },
      colors: {
        'zenaris-blue': '#3B82F6',
        'zenaris-gray': '#8B9BB5',
        'zenaris-light': '#F5F5F7',
        'zenaris-dark': '#1F2937',
        'zenaris-accent': '#10B981',
        'zenaris-warning': '#F59E0B',
        'zenaris-error': '#EF4444',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
    },
  },
  plugins: [],
} 