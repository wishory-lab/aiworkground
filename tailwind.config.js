/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    'text-orange-500',
    'text-orange-600',
    'text-purple-500',
    'text-purple-600',
    'text-emerald-500',
    'text-emerald-600',
    'text-yellow-500',
    'text-pink-500',
    'text-green-600',
    'bg-orange-100',
    'bg-purple-100',
    'bg-emerald-100',
    'from-orange-500',
    'to-pink-500',
    'from-indigo-500',
    'to-purple-600',
    'from-emerald-400',
    'to-teal-500',
    'hover:shadow-orange-500/20',
    'hover:shadow-purple-500/20',
    'hover:shadow-emerald-500/20',
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'float-delayed': 'float-delayed 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
