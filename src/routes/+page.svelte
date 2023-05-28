<script lang="ts">
  import type { Collaborator, Film } from '$lib/clients/contentful'
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
	let directors: Entry<Collaborator>[]

	$: {
		directors = data.page.fields.content.filter(c => c.sys.contentType.sys.id === 'collaborator') as Entry<Collaborator>[]
	}

	$: {
		if (browser && $page.route) {
			document.documentElement.classList.remove('dark')
		}
	}
</script>

<section class:active>
	<nav>
		{#each directors as director}
		{@const film = data.films.items.find(film => film.fields.director?.fields.tagIdentifier === director.fields.tagIdentifier)}
		<a href="/films?director={director.fields.tagIdentifier}" class:active={active && active.fields.identifier === film.fields.identifier} on:mouseenter={() => {
			active = film
			document.documentElement.classList.add('dark')
		}} on:click={(e) => {
			if (!active || active.fields.identifier !== film.fields.identifier) {
				e.preventDefault()
				active = film
				document.documentElement.classList.add('dark')
			}
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
			<button>
				<svg xmlns="http://www.w3.org/2000/svg" width="46.5" height="18.5" viewBox="0 0 46.5 18.5">
					<g id="Group_425" data-name="Group 425" transform="translate(-330 -349.883)">
						<line id="Line_9" data-name="Line 9" x2="46.5" transform="translate(330 359.133)" fill="none" stroke="#fff" stroke-width="2.4"/>
						<line id="Line_10" data-name="Line 10" x2="18.5" transform="translate(353 349.883) rotate(90)" fill="none" stroke="#fff" stroke-width="2.4"/>
					</g>
				</svg>
			</button>
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
	<!-- TELESCOPE -->
  <!-- <Hover texts={['TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE']} /> -->
</h1>

<!-- <section id="start">
	<List items={[...data.articles.items, ...data.films.items]} />
</section> -->


<style lang="scss">
	section {
		position: relative;
		min-height: calc(var(--height) + (var(--gutter) * 1.5));
		margin-top: calc(var(--gutter) * -3.5);
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
			left: calc(var(--gutter) * -1);
			width: calc(100% + (var(--gutter) * 2));
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
				margin-bottom: 0;
				display: flex;
				gap: var(--gutter);
				opacity: 0;
				transition: opacity 666ms, font-variation-settings 333ms;

				&:first-child {
					opacity: 1;
				}

				@media (max-width: 900px) {
					&:not(:first-child) {
						display: none;
					}
				}
			}

			a {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: var(--tiny);

				button {
					display: none;
					opacity: 0;
					transition: opacity 666ms;

					@media (max-width: 900px) {
						display: inline-block;
					}
				}

				&:hover,
				&:focus,
				&.active {
					h4, button {
						opacity: 1;
					}

					h4:first-child {
						font-variation-settings: "wdth" 235;
					}
				}
			}
		}
</style>