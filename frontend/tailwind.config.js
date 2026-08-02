/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gallery: {
          950: '#07080b',
          900: '#0c0e14',
          850: '#12151f',
          800: '#171b28',
          700: '#23293c',
          600: '#343e5a',
          gold: '#d4af37',
          'gold-light': '#f3e5ab',
          bronze: '#b87333',
          emerald: '#10b981',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 35px -5px rgba(212, 175, 55, 0.25)',
        'glow-cyan': '0 0 35px -5px rgba(6, 182, 212, 0.25)',
        'canvas-depth': '0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 1px 1px rgba(255, 255, 255, 0.1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(135deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)',
      },
    },
  },
  plugins: [],
};
