/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'logo-color': '#9100D9',
        'custom-orange' : '#FF9248',
        'card-orange' : '#FF924880',
        'text-color': '#3A3636'
    },
     backgroundImage: {
      'world' : "url(./assets/world.png)",
      'pins' : "url(./assets/pins.png)",
      'passport' : "url(./assets/passport.png)",
      'notebook' : "url(./assets/notebook.png)",
      'leather-notebook' : "url(./assets/leather-notebook.png)"
     },
     spacing: {
      '30': '30%',
      '40': '40%',
      '50': '50%',
    },
  },
  plugins: [],
 }
}
