<script lang="ts">
  import Hover from '$lib/components/Hover.svelte'
  import List from '$lib/components/List.svelte'

  import type { PageData } from './$types'
  export let data: PageData
</script>

<h1>
	TELESCOPE
  <!-- <Hover texts={['TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE', 'TELESCOPE']} /> -->
</h1>

<!-- <section id="start">
	<List items={[...data.articles.items, ...data.films.items]} />
</section> -->


<style>
	h1 {
		/* cursor: move; */
		font-family: 'Telescopique', system-ui, -apple-system;
		margin-bottom: calc(var(--gutter) * 2.5);
		line-height: 1.05;

		text-align: center;
		will-change: transform;
	}

	@media (max-width: 900px) {
    h1 {
      font-size: 6.33vw;
    }
  }
</style>