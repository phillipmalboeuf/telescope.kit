<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'

  import Content from '$lib/components/Content.svelte'
  import Table from '$lib/components/Table.svelte'
  import Media from '$lib/components/Media.svelte'
  import Video from '$lib/components/Video.svelte'
  import Document from '$lib/components/document/index.svelte'

  import { page } from '$app/stores'
  import { pushState } from '$app/navigation'

  import type { PageData } from './$types'
  import { year } from '$lib/formatters'
  import Status from '$lib/components/Status.svelte';
  import { collides } from '$lib/collides';
  
  export let data: PageData

  export let close = false

  onMount(() => {
    if (data.film.fields.tags.includes("film")) {
      document.body.classList.add("films")

      return () => document.body.classList.remove("films")
    } else {
      document.body.classList.add("directors")

      return () => document.body.classList.remove("directors")
    }
  })
</script>

<nav>
  <div use:collides>{data.film.fields.title}</div>
  {#if data.film.fields.director}<div use:collides>
    <a on:click={(e) => {
      const { href } = e.currentTarget
      pushState(href, {})
    }} href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}/directors/{data.film.fields.director.fields.tagIdentifier}">{data.film.fields.director.fields.name}</a>
  </div>{/if}
  <div use:collides><Status film={data.film} /></div>

  <div use:collides>
  {#if !close}<a href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}/films" class="button">{#if $page.data.locale === 'fr'}Fermer{:else}Close{/if}</a>{/if}
  </div>
</nav>

<Video srcs={data.film.fields.video} grabs={data.film.fields.screenGrabs} />

{#if data.film.fields.description}
<main>
  <div>
    <h4>Film</h4>

    <div class="small">
      <Document body={data.film.fields.description} />
    </div>
  </div>
  
  <div>
    {#if data.film.fields.distribution}
    <h4>Distributions</h4>

    <div class="small">
      <Document body={data.film.fields.distribution} />
    </div>
    {/if}
  </div>
  
  
  <div>
    {#if data.film.fields.synopsis}
    <h4>Notes</h4>

    <div class="small">
      <Document body={data.film.fields.synopsis} />
    </div>
    {/if}
  </div>
  
  {#if data.film.fields.prix}
  <div>
    <h4>Prix et distinctions</h4>

    <div class="small">
      <Document body={data.film.fields.prix} />
    </div>
  </div>
  {/if}
</main>
{/if}

{#if data.film.fields.screenGrabs}
<ol>
  {#each data.film.fields.screenGrabs as grab}
  <li>
    <figure>
      <Media media={grab.fields.thumbnail} small />
    </figure>
  </li>
  {/each}
</ol>
{/if}


<!-- {#if data.film.fields.description && data.film.fields.director}
<Table director={data.film.fields.director.fields.tagIdentifier} labels={{ open: 'Voir le portfolio complet', close: `Portfolio de ${data.film.fields.director.fields.name}` }}
  columns={[
    { label: 'Projet', key: 'title' },
    { label: 'Partenaires', key: 'client' },
    { label: 'Réalisateur', key: 'ralisateur' },
    { label: 'Catégorie', key: 'tags' },
    { label: 'Année', key: 'publishedDate' }
  ]} />
{/if} -->

<style lang="scss">
  main {
    padding: $base;
    display: flex;

    @media (max-width: $mobile) {
      flex-direction: column;
      padding: $mobile_base;
    }
    
    :global(html:has(.films)) & {
      background-color: $black-light;

      h4,
      :global(em) {
        color: $grey;
        font-style: normal;
      }
    }

    > div {
      flex: 1;
      position: relative;

      @media (min-width: $mobile) {
        &:after,
        &:before {
          pointer-events: none;
          content: "";
          position: absolute;
          bottom: -1px;
          right: 0;
          width: 100%;
          height: 10vh;
          --turn: 1turn;
          background: linear-gradient(var(--turn), var(--background) 0%, transparent 100%);

          :global(html:has(.films)) & {
            background: linear-gradient(var(--turn), $black-light 0%, transparent 100%);
          }
        }

        &:before {
          --turn: 0.5turn;
          top: 10vh;
          bottom: auto;
        }
      }
      
      > div {
        display: flex;
        flex-direction: column;
        gap: $base;

        @media (min-width: $mobile) {
          max-height: 50vh;
          overflow-y: auto;
          padding-right: $base;
        }

        padding-top: 10vh;
        padding-bottom: 10vh;
      }

      :global(html:has(.films)) & {
        border-color: $grey;
      }

      &:not(:last-child) { border-right: 1px solid; }
      &:not(:first-child) { padding-left: $base; }

      h4 {
        margin-bottom: 10vh;
      }

      :global(td),
      :global(th) {
        padding-bottom: $base * 0.5;
      }

      :global(em) {
        font-style: normal;
        opacity: 0.5;
      }

      @media (max-width: $mobile) {
        padding: $mobile_base 0 ($mobile_base * $mobile_scale * 2) !important;
        border-right: none !important;
        border-bottom: 1px solid;

        h4 {
          margin-bottom: $mobile_base;
        }

        &:first-child {
          h4 { display: none; }

          > div {
            padding-top: $base * $scale * 2;
            padding-bottom: $base;
          }
        }

        &:not(:first-child) {
          > div {
            padding-top: $base;
            padding-bottom: 0;
          }
        }
      }
    }
  }

  ol {
    list-style: none;

    figure {
      width: 50%;

      @media (max-width: $mobile) {
        width: 100%;
      }
    }

    li {

      &:nth-child(2n) {
        figure {
          margin-left: auto;
        }
      }
    }

    :global(html:has(.directors)) & {
      background-color: $white;
    }
  }

  nav {
    position: fixed;
    z-index: 2001;
    top: 0;
    left: 0;
    width: 100vw;

    display: flex;
    justify-content: space-between;
    padding: ($base * 0.75) 0;

    div {
      width: 25%;
      padding: 0 ($base * 0.75);

      @media (min-width: $mobile) {
        &:global(.collides) {
          color: $white !important;
        }
      }

      &:first-child {
        width: 25%;

        &:global(.collides) {
          color: $white !important;
        }
      }

      &:last-child {
        text-align: right;
      }
    }

    @media (max-width: $mobile) {
      position: relative;
      padding: 0;

      div {
        position: absolute;
        z-index: 20;
        top: $base;
        left: 0;

        &:first-child {
          position: fixed;
          width: 75%;
          font-size: $mobile_base * $mobile_scale * 1.15;
        }

        &:not(:first-child) {
          top: calc(50vh + ($base));
          left: 0;
          width: 50%;
        }

        &:nth-last-child(2) {
          left: 50%;
        }

        &:last-child {
          position: fixed;
          top: $base;
          right: 0;
          width: auto;
          font-size: $mobile_base * $mobile_scale;
        }
      }
    }
  }
</style>