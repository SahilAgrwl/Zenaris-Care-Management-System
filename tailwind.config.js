/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
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
    },
  },
  plugins: [],
} 