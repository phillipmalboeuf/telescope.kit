<script lang="ts">
  import Credits from '$lib/components/Credits.svelte'
  import List from '$lib/components/List.svelte'
  import Picture from '$lib/components/Picture.svelte'
  import Tags from '$lib/components/Tags.svelte'
  import Document from '$lib/components/document/index.svelte'

	import { page } from '$app/stores'

  import type { PageData } from './$types'
  export let data: PageData
</script>


<svelte:head>
	<title>{data.article.fields.title}</title>
</svelte:head>


<nav><a rel=prefetch href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}/films">{data.locale === 'fr' ? 'Retour aux films' : 'Back to films'}</a></nav>
<section>
	<nav><h1>{data.article.fields.title} • <Tags tags={data.article.fields.tags} path="/films" /></h1></nav>

	<div>
		<aside>
			{#each data.article.fields.photos as photo}
			<figure>
				<Picture media={photo} />
			</figure>
			{/each}
		</aside>

		<article>
			<Document body={data.article.fields.body} />

			{#if data.article.fields.creditList}<p><Credits credits={data.article.fields.creditList} /></p>{/if}
		</article>
	</div>
</section>

{#if data.article.fields.relatedContent}
<List items={data.article.fields.relatedContent.map(item => ({
    ...item,
    type: item.type || item.sys.contentType.sys.id
  }))} />
{/if}


<style>
	section {
		position: relative;
	}

	nav {
		margin-top: calc(var(--gutter) * -1);
		margin-bottom: calc(var(--rythm) * 3);
	}

	section > nav {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
		margin: 0;
	}

	h1 {
		position: -webkit-sticky;
		position: sticky;
		top: var(--gutter);

		font-size: var(--small);
		writing-mode: vertical-rl;
		transform: rotate(180deg) translateX(2px);
		white-space: nowrap;
	}

	section div {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: calc(var(--rythm) * 2);
	}

		aside {
			width: 42.3vw;

			margin-top: calc(var(--gutter) * -1);
			margin-left: calc(var(--gutter) * -1);
		}

		@media (max-width: 900px) {
			aside {
				width: 100%;
			}
		}

		aside figure {
			margin: 0 0 var(--rythm);
		}

		article {
			width: 37.5vw;
			margin: calc(var(--gutter) * 4) calc(var(--gutter) * 2) calc(var(--rythm) * 2) calc(var(--gutter) * 2);
		}

		@media (max-width: 900px) {
			article {
				width: 100%;
				margin: 0 calc(var(--gutter) * 2) calc(var(--rythm) * 2) auto;
			}
		}

		@media (max-width: 900px) {
			h1 {
				font-size: var(--tiny);
			}
		}
</style>