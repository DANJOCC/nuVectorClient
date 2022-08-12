/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors:{ //palette https://coolors.co/ffffff-e6e6ea-78716b-191308-fc862d
      transparent: 'transparent',
      current: 'currentColor',
      'orange':'#FC862D',
      'white-gray':'#F4F4F8',
      'gray':'#E6E6EA',
      'silver':'#78716B',
      'black':'#191308',
      'white':'rgba(255, 255, 255, 0.5)'
    },
    fontFamily:{
      confortaa:["Confortaa-bold",]
    },
    extend: {
      backgroundImage: {
        'nu-vector': "url('/src/assets/images/background.jpg')",//contribucion agregar
        'nu-vector2': "url('/src/assets/images/background2.jpg')",
      }
    },
  },
  plugins: [],
}
