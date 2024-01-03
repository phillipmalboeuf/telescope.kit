<script lang="ts">
  export let path: string
	export let currentPage: number
  export let numberOfPages: number
	export let query: string = undefined

	import { page } from '$app/stores'

	function paginate({current, max}: {current: number, max: number}) {
		if (!current || !max) return null

		let prev = current === 1 ? null : current - 1,
				next = current === max ? null : current + 1,
				items: (number | string)[] = [1]

		if (current === 1 && max === 1) return {current, prev, next, items}
		if (current > 4) items.push('…')

		let r = 2, r1 = current - r, r2 = current + r

		for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i)

		if (r2 + 1 < max) items.push('…')
		if (r2 < max) items.push(max)

		return {current, prev, next, items}
	}

	let items: (number | string)[] = []

	$: {
		items = paginate({ current: currentPage+1, max: numberOfPages })?.items
	}

	// function search(query) {
	// 	return Object.entries(query).filter(([name, value]) => name !== 'p').reduce((s, [name, value]) => {
	// 		return s + '&' + name + '=' + value
	// 	}, '')
	// }
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
	<a href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}{path}?p={currentPage - 1}{query ? `&${query}` : ''}">{$page.data.locale === 'fr' ? '« Précédent' : '« Prev'}</a>
	{/if}

	{#if items?.length > 1}
	{#each items as item}
	{#if item === '...'}
	<span>{item}</span>
	{:else}
  <a href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}{path}?p={item-1}{query ? `&${query}` : ''}" class:current={item-1 === currentPage}>{item}</a>
	{/if}
  {/each}
	{/if}

	{#if currentPage < numberOfPages - 1}
	<a href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}{path}?p={currentPage + 1}{query ? `&${query}` : ''}">{$page.data.locale === 'fr' ? 'Suivant »' : 'Next »'}</a>
	{/if}
</nav>
