/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';

export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ajusta el path según la estructura de tu proyecto
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#1D4ED8',
          600: '#1E40AF',
          700: '#1E3A8A',
        },
        // Otros colores adicionales que pueden ser útiles
        green: {
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
        purple: {
          500: '#9F7AEA',
          600: '#7C3AED',
          700: '#6D28D9',
        },
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },

    },
  },
  plugins: [
    forms,
  ],
}
