<script lang="ts">
  import Filters from '$lib/components/Filters.svelte'
  import List from '$lib/components/List.svelte'
  import Pagination from '$lib/components/Pagination.svelte'
  import type { Entry } from 'contentful'
  import type { Collaborator } from '$lib/clients/contentful'
  import { page } from '$app/stores'
  
  import type { PageData } from './$types'
  export let data: PageData

  let directors: Entry<Collaborator>[]

	$: {
		directors = data.page.fields.content.filter(c => c.sys.contentType.sys.id === 'collaborator') as Entry<Collaborator>[]
	}
</script>

<svelte:head>
	<title>Films</title>
</svelte:head>

<nav>
  <div>
  {#each directors as director}
  {#if data.currentDirector === director.fields.tagIdentifier}
  <a href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}/films" class:current={true} rel=prefetch>
    <h4>{director.fields.name}</h4>
  </a>
  {:else}
  <a href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}/films?director={director.fields.tagIdentifier}" rel=prefetch>
    <h4>{director.fields.name}</h4>
  </a>
  {/if}
  {/each}

  </div>

  <Filters path="films" tags={data.filmTags} currentTag={data.currentTag} currentDirector={data.currentDirector} />
</nav>



<List items={data.films} query={data.currentDirector && `?director=${data.currentDirector}`} />
<Pagination path="films" currentPage={data.currentPage} numberOfPages={data.numberOfPages} query={data.currentDirector && `director=${data.currentDirector}`} />

<style lang="scss">
  nav {
    position: fixed;
    height: calc(var(--height) - (var(--gutter) * 3));
    width: 28vw;
    top: calc(var(--gutter) * 2.5);
    left: calc(var(--gutter) / 2);
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--gutter);
    
    @media (max-width: 900px) {
      position: static;
      height: auto;
      width: 100%;
      left: 0;
      margin-bottom: var(--gutter);

      br:not(:first-of-type) {
        display: none;
      }
    }

    a {
      
      &:hover,
      &:focus,
      &.current {
        h4 {
          font-variation-settings: "wdth" 400;
        }
      }
    }
  }
</style>