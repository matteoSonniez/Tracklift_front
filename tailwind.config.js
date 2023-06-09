/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        theblue: '#0B8A95', // Exemple de couleur personnalisée nommée "primary"
        thegris: '#BCBDC1',
        thegris2: '#EEEEEF',
        thegris3:'#F4F5F6',
        thered: '#F28071'
      },
    },
  },
  plugins: [],
}
