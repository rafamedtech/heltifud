/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          lg: '1124px',
          xl: '1124px',
          '2xl': '1124px',
        },
      },
    },
  },

  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#7FB714',
          secondary: '#3b82f6',
          accent: '#7FB714',
          neutral: '#d1d5db',
          'base-100': '#f3f4f6',
          'base-300': '#1a1a1a',
          info: '#3baee8',
          success: '#1c978b',
          warning: '#d8a118',
          error: '#f45286',
        },
      },
      {
        forest: {
          ...require('daisyui/src/theming/themes')['forest'],
          primary: '#7FB714',
          'base-300': '#1a1a1a',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '1rem',
        },
      },
    ],
  },
};
