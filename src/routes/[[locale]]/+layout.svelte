<script lang="ts">
  import '../../globals.scss'

  import Header from '$lib/components/Header.svelte'
  import Footer from '$lib/components/Footer.svelte'
  import { page } from '$app/stores'
</script>

{#if !$page.data.film}<Header />{/if}

<main>
  <slot />
</main>

<Footer />