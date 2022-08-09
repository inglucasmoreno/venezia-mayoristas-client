const { guessProductionMode } = require("@ngneat/tailwind");
const colors = require('tailwindcss/colors');

module.exports = {
    prefix: '',
    purge: {
        enabled: guessProductionMode(),
        content: [
            './src/**/*.{html,ts}',
        ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primaryColor: "#005780",
                secondaryColor: "#A31D1E",
                thirdColor: '#fbb984',
                background: colors.gray,
                primary: colors.gray,
                orange: colors.orange,
                secondary: colors.blue,
            },
        },
        fontFamily: {
            display: ["Nunito", "sans-serif"],
        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
};