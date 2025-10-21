/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./*.html', './src/**/*.{html,js}'],
    theme: {
        extend: {
            colors: {
                palette: {
                    lightest: '#e8cbe0', // (232,203,224)
                    light: '#a86487', // (168,100,135)
                    medium: '#977173', // (151,113,115)
                    dark: '#704b5b', // (112,75,91)
                    darkest: '#4f3040', // (79,48,64)
                },
                // Or you can name them semantically
                primary: {
                    50: '#e8cbe0',
                    100: '#a86487',
                    200: '#977173',
                    300: '#704b5b',
                    400: '#4f3040',
                },
            },
            backgroundImage: {
                // Gradient from dark to light (left to right)
                'gradient-palette': 'linear-gradient(to right, #4f3040, #704b5b, #977173, #a86487, #e8cbe0)',

                // Gradient from dark to light (top to bottom)
                'gradient-palette-vertical': 'linear-gradient(to bottom, #4f3040, #704b5b, #977173, #a86487, #e8cbe0)',

                // Gradient from dark to light (diagonal)
                'gradient-palette-diagonal':
                    'linear-gradient(to bottom right, #4f3040, #704b5b, #977173, #a86487, #e8cbe0)',

                // Simple two-color gradients
                'gradient-dark-light': 'linear-gradient(to right, #4f3040, #e8cbe0)',
                'gradient-dark-medium': 'linear-gradient(to right, #4f3040, #977173)',
            },
        },
    },
    plugins: [],
};
