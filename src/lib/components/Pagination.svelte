<script>
  export let path
	export let currentPage
  export let numberOfPages

	import { page } from '$app/stores'

	function search(query) {
		return Object.entries(query).filter(([name, value]) => name !== 'p').reduce((s, [name, value]) => {
			return s + '&' + name + '=' + value
		}, '')
	}
</script>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
    margin-top: calc(var(--rythm) * 2);
	}

		nav a {
			font-family: 'Telescopique', system-ui, -apple-system;
			font-variation-settings: "wdth" 200;
			font-size: var(--tiny);
      cursor: pointer;
      display: inline-block;
			padding: calc(var(--rythm) / 2);
      /* border: 2px solid black; */
      /* margin-right: calc(var(--rythm) / 3); */
		}

      nav a:hover,
      nav a:focus {
        opacity: 1;
				font-variation-settings: "wdth" 325;
      }

		nav a.current {
			font-variation-settings: "wdth" 800;
		}

  /* @media (max-width: 1200px) {
		nav {
			margin-top: calc(var(--rythm) * -1.5);
		}
	}
		
	@media (max-width: 900px) {
		nav {
			margin-top: calc(var(--rythm) * -0.5);
		}
	} */
</style>

<nav>
	{#if currentPage > 0}
	<a href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}{path}?p={currentPage - 1}{search($page.url.searchParams)}">{$page.data.locale === 'fr' ? '« Précédent' : '« Prev'}</a>
	{/if}

	{#each Array.from(Array(numberOfPages)) as _, index}
  <a href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}{path}?p={index}{search($page.url.searchParams)}" class:current={index === currentPage}>{index+1}</a>
  {/each}

	{#if currentPage < numberOfPages - 1}
	<a href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}{path}?p={currentPage + 1}{search($page.url.searchParams)}">{$page.data.locale === 'fr' ? 'Suivant »' : 'Next »'}</a>
	{/if}
</nav>
