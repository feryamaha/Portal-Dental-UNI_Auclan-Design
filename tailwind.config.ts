import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          25: '#FDF2F2',
          50: '#F9D6D7',
          100: '#F2B1B5',
          200: '#E98A91',
          300: '#DF646C',
          400: '#D43E48',
          500: '#8A1724',
          600: '#73131D',
          700: '#5D0F17',
          800: '#460B11',
          900: '#30070B',
          950: '#1E0407'
        },
        secondary: {
          0: "#FFFFFF",
          25: "#FBFBFB",
          50: "#F6F6F6",
          100: "#E7E7E7",
          200: "#D1D1D1",
          300: "#B0B0B0",
          400: "#888888",
          500: "#6D6D6D",
          600: "#5D5D5D",
          700: "#4F4F4F",
          800: "#454545",
          900: "#3D3D3D",
          950: "#191919"
        },

        accent: {
          white: '#FFFFFF',
          light: '#FCEBEC',
          default: '#8A1724',
          dark: '#5D0F17'
        },
        auxiliary: {
          default: '#F44336',
          success: {
            background: '#EEFFF3',
            border: '#B1E4BF',
            default: '#119551'
          },
          danger: {
            background: '#FFF6F8',
            border: '#FFA7A0',
            default: '#DF554B'
          },
          info: {
            background: '#F1F6FD',
            border: '#A7C5FD',
            default: '#1759D3'
          },
          warning: {
            background: '#FFFBED',
            border: '#FCD28C',
            default: '#E69A1A'
          }
        },

        complementary: {
          25: '#EAFBEC',
          50: '#D3F6D9',
          100: '#ADF0B8',
          200: '#87E997',
          300: '#61E277',
          400: '#3DDB5B',
          500: '#1EB03E',
          600: '#189032',
          700: '#137026',
          800: '#0E501B',
          900: '#093012',
          950: '#051F0C'
        },
        neutral: {
          900: '#222222',
          800: '#323232',
          700: '#494949',
          600: '#606060',
          500: '#767676',
          400: '#8D8D8D',
          300: '#A4A4A4',
          200: '#BABABA',
          100: '#EBEBEB',
          50: '#F6F6F6',
          25: '#FAFAFA'
        },
        stroke: {
          50: '#ECECEC',
          100: '#E6E6E6',
          200: '#D1D1D1',
          300: '#B0B0B0'
        }
      },
      backgroundImage: {
        'background-image-login': "url('/assets/images/image-bg-login.webp')",

        'black-overlay':
          'linear-gradient(180deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.60) 100%);',
        'black-overlay-md':
          'linear-gradient(0deg, rgba(0, 0, 0, 0.00) 55.95%, rgba(0, 0, 0, 0.30) 89.66%), linear-gradient(90deg, rgba(0, 0, 0, 0.70) 27.81%, rgba(0, 0, 0, 0.00) 80.31%)',
        'overlay-credential-header':
          'linear-gradient(90deg, rgba(34, 34, 34, 0.50) 0%, rgba(34, 34, 34, 0.08) 100%)',
        'overlay-social-ambiental':
          'linear-gradient(180deg, #000 0%, rgba(0, 0, 0, 0.00) 50%, #000 100%)'
      },
      fontFamily: {
        lato: ['var(--font-lato)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        openSans: ['var(--font-open-sans)', 'sans-serif']
      },
      boxShadow: {
        custom: '0 4px 6px rgba(0, 0, 0, 0.07)',
        '60': '0px 1px 2px 0px rgba(0, 0, 0, 0.08);',
        socialAmbiental: '0px 4px 10px 0px rgba(0, 0, 0, 0.22)',
        cookie: '0px 4px 12px 0px rgba(0, 0, 0, 0.20)',
        '10': '0 1px 4px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(25, 25, 25, 0.08)'
      },
      keyframes: {
        modalSlideIn: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(0)' }
        },
        modalSlideOut: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(0)' }
        },
        overlayFadeIn: {
          from: { opacity: '1' },
          to: { opacity: '1' }
        },
        overlayFadeOut: {
          from: { opacity: '1' },
          to: { opacity: '1' }
        }
      },
      animation: {
        'modal-slide-in': 'modalSlideIn 0s linear forwards',
        'modal-slide-out': 'modalSlideOut 0s linear forwards',
        'modal-overlay-fade-in': 'overlayFadeIn 0s linear forwards',
        'modal-overlay-fade-out': 'overlayFadeOut 0s linear forwards'
      }
    },
    container: {
      center: true,
      padding: '5%',
      screens: {
        '2xl': '1440px',
        xl: '1440px',
        lg: '1440px',
        md: '100%',
        sm: '100%'
      }
    },
    fontSize: {
      xs: ['0.75rem', '140%'],
      sm: ['0.875rem', '140%'],
      md: ['1rem', '140%'],
      xl: ['1.125rem', '140%'],
      '2xl': ['1.25rem', '140%'],
      '3xl': ['2rem', '120%'],
      '4xl': ['2.5rem', '120%'],
      '5xl': ['3rem', '120%'],
      '6xl': ['4rem', '120%']
    },
    screens: {
      ...defaultTheme.screens,
      '@mobile': { min: '639px' },
      '@tablet': { min: '999px' },
      '@laptop': { min: '1025px' },
      '@Desktop': { min: '1281px' },
      '@Desktop1440': { min: '1438px' },
      '@LargeDesktop': { min: '1537px' },
      '@UltraWide': { min: '1929px' }
    }
  },
  plugins: []
} satisfies Config
