import StarlightPlugin from '@astrojs/starlight-tailwind';

// Generated color palettes
const accent = {
	200: '#cbc2e6',
	600: '#7654b6',
	900: '#372953',
	950: '#261e39',
};
const gray = {
	100: '#f6f6f8',
	200: '#eeedf1',
	300: '#c2c1c6',
	400: '#8c8a94',
	500: '#595660',
	700: '#39373f',
	800: '#27252d',
	900: '#18171b',
};

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: { accent, gray },
		},
	},
	plugins: [StarlightPlugin()],
};