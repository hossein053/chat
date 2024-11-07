import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark:{
          background:'#17212B',
          primary: '#D5D4DF',
          primary_2:'#2B5278'
        },
        background:'#fff',
        primary: '#394A6C',
        primary_2:'#419FD9'
      },
      container: {
        center: true,
        padding: {
          'DEFAULT': '0.75rem',
          'sm': '2rem',
          'lg': '4rem',
          'xl': '5rem',
          '2xl': '6rem',
        },
      },
      boxShadow: {
        xs: '0px 0px 24px #5C5696',
        sx: '0px 2px 2px #5C5696'
      },
      backgroundImage: {
        bg_login: 'linear-gradient(90deg, #5D54A4, #7C78B8)',
        bg_shape: 'linear-gradient(270deg, #5D54A4, #6A679E)',
      }
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: any }) {
      const newUtilities = {
        '.rtl': {
          'direction': 'rtl',
        },
        '.ltr': {
          'direction': 'ltr',
        },
        '.row': {
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center'
        },
        '.row-between': {
          'display': 'flex',
          'justify-content': 'space-between',
          'align-items': 'center'
        },
        '.row-start': {
          'display': 'flex',
          'justify-content': 'flex-start',
          'align-items': 'center'
        },
        '.row-end': {
          'display': 'flex',
          'justify-content': 'flex-end',
          'align-items': 'center'
        }
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
};
export default config;
