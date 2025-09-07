/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#18181b', // main background
          card: '#23232a', // card background
          border: '#2d2d36', // card border
          accent: '#6366f1', // accent (indigo)
          text: '#f3f4f6', // main text
          muted: '#a1a1aa', // muted text
        },
        status: {
          uploaded: '#22c55e', // green
          created: '#eab308', // yellow
          downloaded: '#0ea5e9', // blue
          pending: '#f43f5e', // red
        },
      },
    },
  },
  plugins: [],
};
