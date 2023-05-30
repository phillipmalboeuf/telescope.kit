<script lang="ts">
  import Filters from '$lib/components/Filters.svelte'
  import List from '$lib/components/List.svelte'
  import Pagination from '$lib/components/Pagination.svelte'
  
  import type { PageData } from './$types'
  export let data: PageData
</script>

<svelte:head>
	<title>News</title>
</svelte:head>

<nav>
  <Filters path="articles" tags={data.articleTags} currentTag={data.currentTag} />
</nav>

<List items={data.articles.items} grid />
<Pagination path="articles" currentPage={data.currentPage} numberOfPages={data.numberOfPages} />

<style lang="scss">
  nav {
    margin-bottom: var(--gutter);
  }
</style>