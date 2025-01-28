const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        logo: 'var(--font-logo)',
        inter: 'var(--font-inter)',
      },
      colors: {
        'background-overlay': 'var(--background-overlay)',
        'primary': 'var(--primary)',
        'primary-dark': 'var(--primary-dark)',
        'background': 'var(--background)',
        'secondary': 'var(--secondary)',
        'text': 'var(--text-primary)',
        'text-light': 'var(--text-light)',
      },
    },
  },

  plugins: [require('tailwindcss-animate')],
}
export default config
