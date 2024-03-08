<script lang="ts">
  import '$lib/styles.scss'

  import { page } from '$app/stores'

	import Footer from '$lib/components/Footer.svelte'
  import Header from '$lib/components/Header.svelte'
  import Dialog from '$lib/components/Dialog.svelte'
  import Cursor from '$lib/components/Cursor.svelte'

  import type { LayoutData } from './$types'
	export let data: LayoutData
</script>

<svelte:head>
  {#if $page.data.page}
	<title>{$page.data.page.fields.title}</title>
  {/if}
</svelte:head>

{#if !["/[[locale]]/pages/[id]", "/[[locale]]/films/[id]"].includes($page.route.id)}
<Header header={data.header}  />
{/if}

<main class={$page.route.id.replace('/[[locale]]/', '').replace('/[id]', '')}>
  <slot />
</main>

<Dialog />
<Footer footer={data.footer} />

<Cursor />

<style lang="scss">
  main {
    min-height: 90vh;
  }
</style>