<script>
  import { fade, fly } from 'svelte/transition'
  import { onMount, tick } from 'svelte'

  import { page } from '$app/stores'

  import Picture from './Picture.svelte'
  import ListVideo from './ListVideo.svelte'
  import Tag from './Tag.svelte'
  import Document from './document/index.svelte'

  export let items

  $: {
    items = items.map(item => ({
      ...item,
      type: item.type || item.sys.contentType.sys.id
    }))
  }

  let scrollY = 0
  let windowHeight
</script>

<style>
  ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

    li {
      text-align: right;
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
      }

      a.film figure :global(video),
      a.film figure :global(img) {
        width: 66vw;
        height: calc(66vw * 9 / 14);
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

            transition: transform 420ms, font-variation-settings 333ms;
            will-change: transform;
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
        }
      }
</style>

<svelte:window bind:scrollY={scrollY} bind:innerHeight={windowHeight} />

<ol>
	{#each items as item, index (item.sys.id)}
  
	<li in:fly|local="{{ x: 200 * (index % 2 ? 1 : -1), delay: 666, duration: 666 }}" out:fly|local="{{ x: 200 * (index % 2 ? 1 : -1), duration: 666 }}" class:loose={item.type === 'looseText'}>
    {#if item.type === 'looseText'}
    
    <Document body={item.fields.body} />

    {:else}
    <a class={item.type} rel='prefetch' href='{item.type}s/{item.fields.identifier}'>
      <figure>
        {#if item.type === 'film'}
        {#if !$page.data.isMobile && item.fields.teaser}
        <ListVideo {scrollY} {windowHeight} src={item.fields.animationList || item.fields.teaser}
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