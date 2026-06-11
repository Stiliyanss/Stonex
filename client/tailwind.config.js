/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#f8fafb',
        surface: '#ffffff',
        subtle: '#f0f4f8',
        teal: {
          DEFAULT: '#1D9E75',
          dark: '#0F6E56',
        },
        ink: {
          DEFAULT: '#111827',
          soft: '#6b7280',
        },
        midnight: {
          bg: '#eef1fb',
          accent: '#3b5bdb',
          deep: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        tightish: '-0.015em',
      },
      maxWidth: {
        content: '1180px',
      },
    },
  },
  plugins: [],
}
