<script lang="ts">
  import Document from '$lib/components/document/index.svelte'

  import type { PageData } from './$types'
  export let data: PageData  
</script>

<svelte:head>
	<title>{data.locale === 'fr-CA' ? 'À propos' : 'About'}</title>
</svelte:head>

<section>
  <Document body={data.page.fields.body} />
</section>

<style>
	/* nav {
		display: flex;
		margin: calc(var(--rythm) * -2.5) 0 calc(var(--rythm) * 1) calc(var(--rythm) / -2);
	}

		nav a {
			opacity: 0.35;
			padding: calc(var(--rythm) / 2);
		}

		nav a:hover h6 {
			font-variation-settings: "wdth" 225;
		}

		nav a.current {
			opacity: 1;
		} */

	section > :global(h2),
	section > :global(h4),
	section > :global(h6),
	section > :global(p) {
		width: 52vw;
		margin-left: auto;
	}

	@media (max-width: 900px) {
		/* nav {
			margin-top: calc(var(--rythm) * -0.5);
		} */

		section > :global(h2),
		section > :global(h4),
		section > :global(h6),
		section > :global(p) {
			width: 100%;
		}
	}
</style>