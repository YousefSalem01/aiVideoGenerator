/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc7fc',
          400: '#36aaf8',
          500: '#0c8eeb',
          600: '#0071c9',
          700: '#015ba3',
          800: '#064e86',
          900: '#0a4270',
          950: '#072a4a',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede8ff',
          200: '#dbd0ff',
          300: '#c3acff',
          400: '#a77eff',
          500: '#8f4bff',
          600: '#7e22fb',
          700: '#6b0de9',
          800: '#5a0cc2',
          900: '#4b0d9e',
          950: '#2e0069',
        },
        background: {
          light: '#f8fafc',  // slate-50
          DEFAULT: '#ffffff',
          dark: '#f1f5f9',   // slate-100
        },
        text: {
          primary: '#1e293b',   // slate-800
          secondary: '#475569', // slate-600
          muted: '#94a3b8',     // slate-400
        },
        border: {
          light: '#e2e8f0',     // slate-200
          DEFAULT: '#cbd5e1',   // slate-300
          dark: '#94a3b8',      // slate-400
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: '700',
              fontSize: '2.25rem',
              lineHeight: '2.5rem',
            },
            h2: {
              fontWeight: '600',
              fontSize: '1.875rem',
              lineHeight: '2.25rem',
            },
            h3: {
              fontWeight: '600',
              fontSize: '1.5rem',
              lineHeight: '2rem',
            },
            p: {
              fontSize: '1rem',
              lineHeight: '1.5rem',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
