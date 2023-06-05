<script lang="ts">
  import '../../globals.scss'

  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'

  import { page } from '$app/stores'
  import { browser } from '$app/environment'

  $: {
		if (browser && window.gtag) {
			window.gtag('config', 'UA-156842255-1', {
				page_path: $page.url.pathname,
			})
		}
	}
</script>

{#if !$page.data.film}<Header />{/if}

<main>
  <slot />
</main>

<Footer />