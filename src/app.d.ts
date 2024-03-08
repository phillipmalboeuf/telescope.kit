// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		interface PageState {
			type?: 'film' | 'contact' | 'page'
			open?: any
		}
		// interface Platform {}
	}
}

export {};
