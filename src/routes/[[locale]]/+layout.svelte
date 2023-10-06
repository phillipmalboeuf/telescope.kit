<script lang="ts">
  import '../../globals.scss'

  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import Popup from '$lib/components/Popup.svelte'

  import { page } from '$app/stores'
  import { browser } from '$app/environment'

  $: {
		if (browser && window.gtag) {
			window.gtag('config', 'UA-156842255-1', {
				page_path: $page.url.pathname,
			})
		}

    if (browser && $page.url) {
			document.documentElement.classList.remove('dark')
		}
	}
</script>

{#if !$page.data.popup}<Popup />{/if}
{#if !$page.data.film}<Header />{/if}

<main>
  <slot />
</main>

<Footer />