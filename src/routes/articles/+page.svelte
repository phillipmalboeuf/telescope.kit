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

<Filters path="articles" all="{data.locale === 'fr-CA' ? 'Tous les nouvelles' : 'All News'}" currentTag={data.currentTag} currentCollaborator={data.currentCollaborator} />

<List items={data.articles.items} />
<Pagination path="articles" currentPage={data.currentPage} numberOfPages={data.numberOfPages} />