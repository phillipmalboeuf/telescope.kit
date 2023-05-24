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

<Filters path="films" all="{data.locale === 'fr-CA' ? 'Tous les films' : 'All Films'}" currentTag={data.currentTag} currentCollaborator={data.currentCollaborator} />

<List items={data.films.items} />
<Pagination path="films" currentPage={data.currentPage} numberOfPages={data.numberOfPages} />