<script lang="ts">
  import { page } from '$app/stores'
  import type { Tag as ContentTag } from '$lib/clients/contentful'
  
	import Tag from './Tag.svelte'
  export let tags: string[]
	export let path: string
	export let currentTag: string = undefined
  export let currentDirector: string = undefined

  let contentTags = $page.data.tags.reduce((contentTags, tag) => {
    return { ...contentTags, [tag.fields.identifier]: tag.fields }
  }, {}) as { [id: string]: ContentTag['fields'] }
</script>

<nav>
  <a href={`${$page.data.locale === 'fr' ? path : `/${$page.data.locale}${path}`}`} rel=prefetch
    class:current={currentTag === null}><h6>{$page.data.locale === 'fr' ? 'Tous' : 'All'}</h6></a>

  {#each tags as tag}
	{#if tag !== 'recent' && tag.indexOf('20') !== 0 && !contentTags[tag]?.isACollaborator}
	<a href="{path}?tag={tag}{currentDirector ? `&director=${currentDirector}` : ''}" rel=prefetch class:current={tag === currentTag}><h6><Tag id={tag} /></h6></a> 
	{/if}
	{/each}
</nav>


<style>
	nav {
		display: flex;
		flex-wrap: wrap;
    gap: calc(var(--rythm) / 3);
		/* margin: calc(var(--rythm) * -2.5) 0 calc(var(--rythm) * 1) calc(var(--rythm) / -2); */
	}

		nav a {
      cursor: pointer;
			opacity: 0.35;
      display: inline-block;
			/* padding: calc(var(--rythm) / 2); */
		}

      nav a:hover,
      nav a:focus {
        opacity: 1;
      }

			nav a h6 {
				margin-bottom: 0;
			}

        nav a:hover h6,
        nav a:focus h6,
        nav > span:hover h6 {
          font-variation-settings: "wdth" 235;
        }

		nav a.current {
			opacity: 1;
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