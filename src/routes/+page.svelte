<script lang="ts">
  import type { Film } from '$lib/clients/contentful'
	import type { Entry } from 'contentful'
	import { fade, fly } from 'svelte/transition'

  import Hover from '$lib/components/Hover.svelte'
  import List from '$lib/components/List.svelte'
	import Tags from '$lib/components/Tags.svelte'
	import ListVideo from '$lib/components/ListVideo.svelte'

	import { page } from '$app/stores'
	import { browser } from '$app/environment'

  import type { PageData } from './$types'
  export let data: PageData

	let active: Entry<Film>

	$: {
		if (browser && $page.route) {
			document.documentElement.classList.remove('dark')
		}
	}
</script>

<section class:active>
	<nav>
		{#each data.directors.items as director}
		{@const film = data.films.items.find(film => film.fields.director?.fields.tagIdentifier === director.fields.tagIdentifier)}
		<a href="/films?director={director.fields.tagIdentifier}" on:pointerenter={() => {
			active = film
			document.documentElement.classList.add('dark')
		}} on:pointerleave={() => {
			// active = undefined
			// document.documentElement.classList.remove('dark')
		}} on:click={() => {
			// document.documentElement.classList.remove('dark')
		}}>
			<h4>{director.fields.name}</h4>
			{#if film}
			<h4 class="wide">{film.fields.title}</h4>
			<h4><Tags tags={film.fields.tags} /></h4>
			{/if}
		</a>
		{/each}
	</nav>

	{#if active}
	{#key active.fields.identifier}
	<figure transition:fade>
		<ListVideo src={active.fields.animationList || active.fields.teaser}
      poster={active.fields.poster && `${active.fields.poster.fields.file.url}?w=900`} />
	</figure>
	{/key}
	{/if}
</section>

<h1>
	TELESCOPE
  <!-- <Hover texts={['TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE']} /> -->
</h1>

<!-- <section id="start">
	<List items={[...data.articles.items, ...data.films.items]} />
</section> -->


<style lang="scss">
	section {
		min-height: calc(100vh - (var(--gutter) * 1));
		margin-top: calc(var(--gutter) * -2);
		display: flex;
		flex-direction: column;
		justify-content: center;

		&.active {
			// background-color: black;
			color: white;
		}
	}

		figure {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			margin: 0;
			z-index: 0;
			background-color: black;

			:global(video) {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		nav {
			position: relative;
			z-index: 2;
			height: 100%;
			
			h4 {
				margin-bottom: var(--tiny);
				display: flex;
				gap: var(--gutter);
				opacity: 0;
				transition: opacity 666ms;

				&:first-child {
					opacity: 1;
				}
			}

			a {
				display: flex;
				justify-content: space-between;

				&:hover,
				&:focus {
					h4 {
						opacity: 1;
					}
				}
			}
		}

	h1 {
		/* cursor: move; */
		font-family: 'Telescopique', system-ui, -apple-system;
		font-variation-settings: "wdth" 500;
		margin-top: calc(var(--gutter) * 1);
		/* margin-bottom: calc(var(--gutter) * 2.5);
		line-height: 1.05; */

		text-align: center;
		will-change: transform;
	}

	@media (max-width: 900px) {
    h1 {
      font-size: 6.33vw;
    }
  }
</style>