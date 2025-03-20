import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        bgPrimary: colors.orange[700],
        bgSoft: colors.orange[100],
        bgDefault: colors.white,
        textPrimary: colors.orange[950],
        textSecondary: colors.slate[500],
        textDisabled: colors.orange[400],
        textDefault: colors.white,
        buttonDefault: colors.orange[500],
        buttonHover: colors.orange[600],
        buttonActive: colors.orange[700],
        buttonDisabled: colors.orange[100],
        borderDark: colors.orange[800],
        borderLight: colors.orange[400],
      },
    },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
    fontFamily: {
      machine: ['"OCR A"', 'monospace'],
    },
  },
  plugins: [forms],
};

export default config;
