<script lang="ts">
  import Content from '$lib/components/Content.svelte';
  import type { PageData } from './$types'
  export let data: PageData
</script>

<svelte:head>
	<title>{data.page.fields.title}</title>
	<meta name="description" content={data.page.fields.description} />
</svelte:head>

<Content content={data.page.fields.content} />
