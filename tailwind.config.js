/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`./views/**/*.ejs`],
  theme: {
    extend: {
      daisyui: {
        themes: ['cupcake'],
      },
    },
  },
  plugins: [require('daisyui'),require('@tailwindcss/typography'),],
  daisyui: {
    themes: false, 
    darkTheme: "dark", 
    base: true, 
    styled: true, 
    utils: true, 
    prefix: "", 
    logs: true, 
    themeRoot: ":root", 
  },
}

