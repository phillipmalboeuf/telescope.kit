<script lang="ts">
  import Content from '$lib/components/Content.svelte'
  import Document from '$lib/components/document/index.svelte'

  import { page } from '$app/stores'
  import { pushState } from '$app/navigation'

  import type { PageData } from './$types'
  import Logo from '$lib/components/Logo.svelte';
  export let data: PageData
</script>

<svelte:head>
	<title>{data.page.fields.title}</title>
	<meta name="description" content={data.page.fields.description} />
</svelte:head>

<main>
  <nav>
    <a href="{$page.data.locale === 'fr' ? '/' : `/${$page.data.locale}`}">Telescope</a>
    <h1 class="h6">{data.page.fields.title}</h1>
  </nav>
  <section>
    <Content content={data.page.fields.content} />
    <div></div>
  </section>
  <figure>
    <Logo />
  </figure>
</main>


<style lang="scss">
  main {
    display: flex;
    flex-wrap: wrap;
    // justify-content: flex-end;
    min-height: 100vh;
    padding: $base;

    color: $white;
		background-color: $black-light;

    h1 {
      text-align: left;
    }

    figure {
      width: 100%;

      :global(svg) {
        width: 100%;
      }
    }

    nav {
      width: 100%;
      display: flex;

      > a,
      > h1 {
        flex: 1;
      }

      > a {
        opacity: 0.5;
        transition: opacity 333ms;

        &:hover,
        &:focus {
          opacity: 1;
        }
      }
    }

    section {
      width: 100%;
      min-height: 75vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: $gap;
      // border-left: 1px solid $grey;
      padding: ($gap * 2) 0;

      @media (max-width: $mobile) {
        width: 100%;
      }
    }
  }
</style>