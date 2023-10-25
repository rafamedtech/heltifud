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
        forest: {
          ...require('daisyui/src/theming/themes')['[data-theme=forest]'],
          primary: '#7FB714',
          'base-300': '#1a1a1a',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '1rem',
        },
      },
    ],
  },
};
