import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	...process.env.NODE_ENV !== 'development' && {ssr: {
		noExternal: ['contentful']
	}}
});
