<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { onMount, tick } from 'svelte'

  import { page } from '$app/stores'

  import Picture from './Picture.svelte'
  import ListVideo from './ListVideo.svelte'
  import Tag from './Tag.svelte'
  import Document from './document/index.svelte'

  export let items
  export let grid = false
  export let query: string = undefined

  $: {
    items = items.map(item => ({
      ...item,
      type: item.type || item.sys.contentType.sys.id
    }))
  }

  // let scrollY = 0
  // let windowHeight
</script>

<style lang="scss">
  ol {
    overflow-x: hidden;
    list-style: none;
    padding: 0;
    margin: 0;

    &.grid {
      display: flex;
      flex-wrap: wrap;
      gap: var(--gutter);

      li {
        text-align: left;
      }
    }
  }

    li {
      text-align: right;

      @media (max-width: 900px) {
        text-align: left;
      }
    }

    a {
      display: inline-block;
      cursor: default;
    }

      figure {
        position: relative;
        margin: 0 0 calc(var(--gutter) / 1.5);
      }

        li:last-child figure {
          margin-bottom: 0;
        }

      figure :global(video),
      figure :global(img) {
        height: calc(50vw - (var(--gutter) * 1.5));
        width: calc(50vw - (var(--gutter) * 1.5));
        object-fit: cover;
        object-position: center center;
        transition: width 420ms;
        
        position: relative;
        z-index: 1;

        @media (max-width: 900px) {
          width: 100%;
          height: calc(50vh - (var(--gutter) * 1.5));
        }
      }

      a.film figure :global(video),
      a.film figure :global(img) {
        width: calc(66.6vw - (var(--gutter) / 2));
        height: calc(66.6vw * 9 / 14);

        @media (max-width: 900px) {
          width: 100%;
          height: calc(100vw * 9 / 14);
        }
      }

        figcaption {
          /* position: absolute;
          top: 0;
          left: 100%;
          width: 32.5vw;
          height: 100%; */
          /* padding: 0 calc(var(--gutter) / 2) var(--gutter); */
          /* transform: translateX(-100%); */
          /* opacity: 0; */

          width: 100%;
          display: flex;
          justify-content: space-between;

          transition: transform 420ms, opacity 420ms;
          will-change: transform;
        }

          /* figcaption h4 {
            margin-bottom: calc(var(--rythm) / 4);
          } */

          figcaption h6 {
            /* transform: translateX(-25%); */

            max-width: 400px;
            transition: transform 420ms, font-variation-settings 333ms;
            will-change: transform;

            @media (max-width: 900px) {
              &:nth-child(2) {
                display: none;
              }
            }
          }

      @media (hover: hover) {
        a:hover figcaption {
          transform: translateX(0);
          opacity: 1;
        }

          a:hover figcaption h6 {
            transform: translateX(0);
          }

        a:hover figure :global(video),
        a:hover figure :global(img) {
          /* width: calc(52.5vw - (var(--gutter) * 1.5)); */
        }

        a:hover :global(video:hover),
        a:hover :global(img:hover) {
          width: calc(52.5vw - (var(--gutter) * 1.5));
          cursor: pointer;

          @media (max-width: 900px) {
            width: 100%;
          }
        }

        a:hover :global(h6:hover),
        a:hover :global(h4:hover) {
          cursor: pointer;
          font-variation-settings: "wdth" 285;
        }

        a:hover :global(h6:hover) {
          font-variation-settings: "wdth" 235;
        }

        a.film:hover figure :global(video:hover),
        a.film:hover figure :global(img:hover) {
          width: 70vw;

          @media (max-width: 900px) {
            width: 100%;
          }
        }
      }
</style>

<!-- <svelte:window bind:scrollY={scrollY} bind:innerHeight={windowHeight} /> -->

<ol class:grid>
	{#each items as item, index (item.sys.id)}
  
	<li in:fly|local="{{ x: 200 * (index % 2 ? 1 : -1), delay: 666, duration: 666 }}" out:fly|local="{{ x: 200 * (index % 2 ? 1 : -1), duration: 666 }}" class:loose={item.type === 'looseText'}>
    {#if item.type === 'looseText'}
    
    <Document body={item.fields.body} />

    {:else}
    <a class={item.type} rel='prefetch' href='{item.type}s/{item.fields.identifier}{query}'>
      <figure>
        {#if item.type === 'film'}
        {#if !$page.data.isMobile && item.fields.teaser}
        <ListVideo src={item.fields.animationList || item.fields.teaser}
          poster={`${item.fields.poster.fields.file.url}?w=900`} />
        {:else}
        <Picture media={item.fields.poster} />
        {/if}
        {:else}
        <Picture media={item.fields.poster} />
        {/if}
        <figcaption>
          <h6>{item.fields.title}</h6>
          {#if item.fields.ralisateur}<h6>{item.fields.ralisateur}</h6>{/if}
          {#if item.fields.tags}<h6><Tag id={item.fields.tags[0]} /></h6>{/if}
        </figcaption>
      </figure>
    </a>
    {/if}
  </li>
  {:else}
  <h6><em>{$page.data.locale === 'fr-CA' ? 'Aucun résultats.' : 'No results.'}</em></h6>
	{/each}
</ol>