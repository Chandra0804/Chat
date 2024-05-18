/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        "chat-window-pattern": "url('/images/chatWindow.png')",
      }),
    },
  },
  plugins: [],
}