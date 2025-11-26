/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0f5ff',
                    100: '#dce8ff',
                    200: '#b8d1ff',
                    300: '#8bb5ff',
                    400: '#5a8fff',
                    500: '#3366ff',
                    600: '#1e3a5f',
                    700: '#1a2f4f',
                    800: '#152540',
                    900: '#0f1b30',
                },
                golden: {
                    50: '#fefcf3',
                    100: '#fdf7e0',
                    200: '#faefc1',
                    300: '#f7e29d',
                    400: '#f3d574',
                    500: '#d4af37',
                    600: '#b8942e',
                    700: '#967825',
                    800: '#6f5a1c',
                    900: '#4a3c13',
                },
                parchment: {
                    50: '#fefdfb',
                    100: '#fdfbf7',
                    200: '#fbf7ed',
                    300: '#f8f2e1',
                    400: '#f4e8c1',
                    500: '#e8d8a8',
                    600: '#d4c298',
                    700: '#b8a87d',
                    800: '#9c8e62',
                    900: '#7d7350',
                }
            },
            fontFamily: {
                serif: ['Playfair Display', 'serif'],
                sans: ['Inter', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'slide-down': 'slideDown 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
