/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: ['quicksand'],
		},
		extend: {
			backgroundImage: {
				'hero-pattern': 'linear-gradient(315deg, #130f40 0%, #000000 74%);',
				'rose-gradient': 'linear-gradient(315deg, #acabb0 0%, #e01c34 74%);',
			},
			borderWidth: {
				d: '0.5px',
			},
		},
	},
	plugins: [],
}
