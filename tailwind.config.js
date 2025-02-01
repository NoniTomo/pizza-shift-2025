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
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          'DEFAULT': 'hsl(var(--secondary))',
          'foreground': 'hsl(var(--secondary-foreground))',
          // Цвета для карточек и всплывающих элементов
          'card': {
            DEFAULT: 'hsl(var(--card))',
            foreground: 'hsl(var(--card-foreground))',
          },
          'popover': {
            DEFAULT: 'hsl(var(--popover))',
            foreground: 'hsl(var(--popover-foreground))',
          },

          // Основные цвета (primary, secondary, accent)
          'primary': {
            DEFAULT: 'hsl(var(--primary))',
            dark: 'hsl(var(--primary-dark))',
            foreground: 'hsl(var(--primary-foreground))',
          },
          'secondary': {
            DEFAULT: 'hsl(var(--secondary))',
            dark: 'hsl(var(--secondary-dark))',
            foreground: 'hsl(var(--secondary-foreground))',
          },
          'secondary-2': {
            DEFAULT: 'hsl(var(--secondary-2))',
            foreground: 'hsl(var(--secondary-2-foreground))',
          },
          'accent': {
            DEFAULT: 'hsl(var(--accent))',
            foreground: 'hsl(var(--accent-foreground))',
          },

          // Цвета для текста и фона
          'muted': {
            DEFAULT: 'hsl(var(--muted))',
            foreground: 'hsl(var(--muted-foreground))',
          },

          // Цвета для состояний (ошибки, предупреждения, успех)
          'destructive': {
            DEFAULT: 'hsl(var(--destructive))',
            light: 'var(--destructive)',
            foreground: 'hsl(var(--destructive-foreground))',
          },
          'success': {
            DEFAULT: 'hsl(var(--success))',
            foreground: 'hsl(var(--success-foreground))',
          },
          'warning': {
            DEFAULT: 'hsl(var(--warning))',
            foreground: 'hsl(var(--warning-foreground))',
          },

          // Цвета для границ и input-элементов
          'border': 'hsl(var(--border))',
          'input': 'hsl(var(--input))',
          'ring': 'hsl(var(--ring))',
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
      },
    },
  },

  plugins: [require('tailwindcss-animate')],
}
export default config
