/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          
        "primary": "#adc1e0",
                  
        "secondary": "#994e92",
                  
        "accent": "#515052",
                  
        "neutral": "#0f4f69",
                  
        "base-100": "#4e6c99",
                  
        "info": "#515052",
                  
        "success": "#65a30d",
                  
        "warning": "#22c55e",
                  
        "error": "#be185d",
          },
        },
      ],
    },
  plugins: [
    require('daisyui'),
  ],
}

