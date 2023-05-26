<script lang="ts">
  import Filters from '$lib/components/Filters.svelte'
  import List from '$lib/components/List.svelte'
  import Pagination from '$lib/components/Pagination.svelte'
  
  import type { PageData } from './$types'
  export let data: PageData
</script>

<svelte:head>
	<title>Films</title>
</svelte:head>

<nav>
  {#each data.directors.items as director}
  {#if data.currentDirector === director.fields.tagIdentifier}
  <a href="/films" class:current={true} rel=prefetch>
    <h4>{director.fields.name}</h4>
  </a>
  {:else}
  <a href="/films?director={director.fields.tagIdentifier}" rel=prefetch>
    <h4>{director.fields.name}</h4>
  </a>
  {/if}
  {/each}

  <br><br><br><br>

  <Filters path="films" tags={data.filmTags} currentTag={data.currentTag} currentDirector={data.currentDirector} />
</nav>



<List items={data.films.items} />
<Pagination path="films" currentPage={data.currentPage} numberOfPages={data.numberOfPages} />

<style lang="scss">
  nav {
    position: fixed;
    height: 100vh;
    width: 28vw;
    top: 0;
    left: calc(var(--gutter) / 2);

    display: flex;
    flex-direction: column;
    justify-content: center;

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