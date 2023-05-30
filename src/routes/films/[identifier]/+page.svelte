<script lang="ts">
  import Credits from '$lib/components/Credits.svelte'
  import List from '$lib/components/List.svelte'
  import Tags from '$lib/components/Tags.svelte'
  import Video from '$lib/components/Video.svelte'
  import Document from '$lib/components/document/index.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>


<svelte:head>
	<title>{data.film.fields.title}</title>
</svelte:head>

<Video srcs={data.film.fields.video} grabs={data.film.fields.screenGrabs}>
	<h6 slot="title">
		{data.film.fields.title}{#if data.film.fields.realisateur}&nbsp;• {data.film.fields.realisateur}{/if} • <Tags tags={data.film.fields.tags} seperator="•" path="data.films" />
	</h6>
</Video>

<section>
	<nav><h1>{data.film.fields.title} • <Tags tags={data.film.fields.tags} path="data.films" /></h1></nav>

	<aside>
		<Document body={data.film.fields.crew} />
	</aside>

	<article>
		<Document body={data.film.fields.description} />

		{#if data.film.fields.creditList}<p><Credits credits={data.film.fields.creditList} /></p>{/if}
	</article>
</section>

{#if data.film.fields.relatedContent}
<List items={data.film.fields.relatedContent.map(item => ({
    ...item,
    type: item.sys.contentType.sys.id
  }))} />
{/if}


<style>
	section {
		position: relative;
	}

	aside {
		width: 32.5vw;
	}

	article {
		margin-top: calc(var(--gutter) * -3);
		margin-bottom: calc(var(--rythm) * 2);
	}

	article > :global(h2),
	article > :global(h4),
	article > :global(h6),
	article > :global(p) {
		width: 52.5vw;
		margin-left: auto;
		margin-right: var(--gutter);
	}

	@media (max-width: 900px) {
		aside {
			width: 100%;
		}

		article {
			margin-top: calc(var(--gutter));
			margin-right: calc(var(--gutter));
		}

		article > :global(h2),
		article > :global(h4),
		article > :global(h6),
		article > :global(p) {
			width: 100%;
		}
	}

	nav {
		position: absolute;
		top: 0;
		right: 0;
		height: 100%;
	}

	h1 {
		position: -webkit-sticky;
    position: sticky;
		top: var(--gutter);

		font-size: var(--small);
		writing-mode: vertical-rl;
		transform: rotate(180deg) translateX(2px);
		white-space: nowrap;
		margin: 0;
  }

	@media (max-width: 900px) {
		h1 {
			font-size: var(--tiny);
		}
	}
</style>