<script lang="ts">
  import { page } from '$app/stores'
  import type { Popup } from '$lib/clients/contentful'
  import type { Entry } from 'contentful'
  import { fade, fly } from 'svelte/transition'
  import { onMount } from 'svelte'

  import Document from './document/index.svelte'
  import Picture from './Picture.svelte'

  let popup = $page.data.popups[0] as Entry<Popup, "WITHOUT_UNRESOLVABLE_LINKS">
  let visible = false

  onMount(() => {
    visible = true
  })
</script>

{#if visible}
<aside transition:fade>
  <button on:click={() => visible = false}>
    <svg xmlns="http://www.w3.org/2000/svg" width="46.749" height="17.38" viewBox="0 0 46.749 17.38">
      <line x2="46" y2="14.85" transform="translate(0.374 1.291)" fill="none" stroke="#fff" stroke-width="2.4"/>
      <line y1="15.1" x2="46" transform="translate(0.374 1.14)" fill="none" stroke="#fff" stroke-width="2.4"/>
    </svg>
  </button>

  <main>
    {#if popup.fields.title}<h1>{popup.fields.title}</h1>{/if}
    {#if popup.fields.body}<Document body={popup.fields.body} />{/if}
    {#if popup.fields.link}<h3><a on:click={() => visible = false} href="{popup.fields.link}">{popup.fields.linkLabel}</a></h3>{/if}
  </main>

  {#if popup.fields.poster}
  <figure>
    <Picture media={popup.fields.poster} />
  </figure>
  {/if}
</aside>
{/if}

<style lang="scss">
  aside {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    color: white;
    background-color: black;

    display: flex;
    align-items: center;
    padding: 7vw;

    @media (max-width: 900px) {
      padding: 1vh;
      align-items: flex-end;
    }

    figure {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      margin: 0;

      :global(img) {
        height: 100%;
        object-fit: cover;
      }
    }

    button {
      position: absolute;
      top: 0;
      right: 0;
      padding: 2vw;

      @media (max-width: 900px) {
        padding: 3vh;
      }
    }

    main {
      min-height: auto;
      max-width: calc(var(--rythm) * 24);

      h1 {
        font-size: calc(var(--rythm) * 2);
        margin-bottom: 0;
      }

      :global(p) {
        white-space: pre-line;
      }

      :global(em) {
        font-style: normal;
        text-transform: uppercase;
      }
    }
  }
</style>