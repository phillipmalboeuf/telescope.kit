<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Table from '$lib/components/Table.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<svelte:head>
	<title>{data.page.fields.title}</title>
	<meta name="description" content={data.page.fields.description} />
</svelte:head>

<Content content={data.page.fields.content} />

<Table tag='Commercial,videoclip' labels={{ open: 'Voir tous les projets', close: 'Projets commerciaux' }}
  columns={[
    { label: 'Projet', key: 'title' },
    { label: 'Partenaires', key: 'client' },
    { label: 'Réalisateur', key: 'ralisateur' },
    { label: 'Catégorie', key: 'tags' },
    { label: 'Année', key: 'publishedDate' }
  ]} />