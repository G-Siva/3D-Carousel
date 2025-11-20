module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        pagebg: '#0f0e0e',
        text: '#ffffff',
        linkhover: 'rgba(255,255,255,0.6)'
      },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
};
