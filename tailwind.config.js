/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark Academia Color Palette
        background: '#0a0a0a',
        foreground: '#f5f5dc',
        primary: '#2c1810',
        secondary: '#3d2b1f',
        accent: '#d4af37',
        text: '#f5f5dc',
        card: '#1a1a1a',
        muted: '#8b7355',
        border: '#3d2b1f',
        gold: '#d4af37',
        cream: '#f5f5dc',
        brown: '#8b4513',
        'dark-brown': '#2c1810',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Times New Roman', 'serif'],
        heading: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'academia-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2c1810 100%)',
        'card-gradient': 'linear-gradient(145deg, #1a1a1a 0%, #2c1810 100%)',
        'gold-gradient': 'linear-gradient(180deg, #d4af37 0%, #8b4513 100%)',
      },
      boxShadow: {
        'academia': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'gold-glow-hover': '0 0 30px rgba(212, 175, 55, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
