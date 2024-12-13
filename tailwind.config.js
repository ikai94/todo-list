/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F25551',
        'second-200': '#FEEDE1',
        'second-100': '#FFFBFF',
        'green-gradient': '#50F283',
        'dark-900': '#241722',
        'dark-800': '#352432',
        'dark-700': '#462730',
        'dark-600': '#462730',
        'dark-500': '#5c4358',
        backdrop: 'rgba(36,23,34,0.44)',
      },
      backgroundImage: {
        gradient:
          'linear-gradient(180deg, #632329 0%, #f25551 49.65%, rgba(80, 242, 131, 0.8) 100%)',
      },
      boxShadow: {
        shadowList: '0px 10px 27px -2px rgba(0, 0, 0, 0.77)',
      },
    },
  },
  plugins: ['@tailwindcss/forms'],
};
