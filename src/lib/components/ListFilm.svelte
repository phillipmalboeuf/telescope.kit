<script lang="ts">
  import type { TypeFilmSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { page } from '$app/stores'
  import { fade, fly } from 'svelte/transition'

  import Media from './Media.svelte'
  import Document from './document/index.svelte'

  import { goto, preloadData, pushState } from '$app/navigation'
  import { date, year } from '$lib/formatters'
  import type { MouseEventHandler } from 'svelte/elements'
  import { onMount } from 'svelte';
  import { boxes } from '$lib/collides';
  import Status from './Status.svelte';
  import TooLong from './TooLong.svelte';

  export let i: number
  export let film: Entry<TypeFilmSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  export let full = false
  export let wide = false

  let popup = false
  let element: HTMLElement
  let video: HTMLVideoElement

  const go: MouseEventHandler<HTMLAnchorElement> = async (e) => {
    if (e.metaKey) return;

    e.preventDefault()
    const { href } = e.currentTarget
    const result = await preloadData(href)

    if (result.type === 'loaded' && result.status === 200) {
      pushState(href, { type: 'film', open: result.data })
    } else {
      goto(href)
    }
  }

  onMount(() => {
    boxes.update((value) => ({ ...value, [i]: element }))

    return () => {
      boxes.update((value) => ({ ...value, [i]: undefined }))
    }
  })
</script>

<a on:mouseenter={() => video.play()} on:mouseleave={() => video.pause()} on:click={go}
  href={`${$page.data.locale === 'fr' ? `/films/${film.fields.identifier}` : `/${$page.data.locale}/films/${film.fields.identifier}`}`}>
  <figure bind:this={element} class:full class:wide>
    {#if $page.data.device === 'desktop' && (film.fields.animationList || film.fields.teaser)}
    <Media media={film.fields.animationList || film.fields.teaser} small={!wide} bind:video poster={film.fields.poster} background />
    {:else}
    <Media media={film.fields.poster} ar={wide ? undefined : full ? undefined : undefined} small={!wide} />
    {/if}

    {#if film.fields.popup && popup}
    <figcaption class="popup" transition:fly={{ y: '100%', duration: 333 }}>
      <div>
        <h4>{film.fields.title}</h4>
        <h5>{#if film.fields.director}{film.fields.director.fields.name}{/if}</h5>
      </div>

      <div>
        {#if film.fields.popup.fields.title}<h4 class="title">{@html film.fields.popup.fields.title.replaceAll('\\n', '<br>')}</h4>{/if}
        {#if film.fields.popup.fields.body}<div class="small"><Document body={film.fields.popup.fields.body} /></div>{/if}

        <footer>
          {#if film.fields.popup.fields.link}<a class="button button--blur button--blur--light" href="{film.fields.popup.fields.link}">{film.fields.popup.fields.linkLabel}</a>{/if}
        </footer>
      </div>

      <button on:click|stopPropagation|preventDefault={() => {
        popup = false
      }}><svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="white"/> <path d="M4.68701 4.95312L13.047 13.3131" stroke="#0F0F0F" stroke-width="2"/> <path d="M13.047 4.95312L4.68701 13.3131" stroke="#0F0F0F" stroke-width="2"/> </svg></button>
    </figcaption>
    {:else}
    <figcaption transition:fly={{ y: '100%', duration: 333 }}>
      <h6><TooLong hoverable content={film.fields.title} /></h6>
      <h6>{#if film.fields.director}{film.fields.director.fields.name}{:else if film.fields.ralisateur}{film.fields.ralisateur}{/if}</h6>
      <h6><Status {film} /></h6>
      <!-- {#if item.fields.tags}<h6><Tag id={item.fields.tags[0]} /></h6>{/if} -->
    </figcaption>
    {/if}

    {#if film.fields.popup && !popup}
    <aside transition:fly={{ y: $page.data.device !== 'desktop' ? '-100%' : '100%', duration: 333 }}>
      <button class="button--blur button--blur--light" on:click|stopPropagation|preventDefault={() => {
        popup = true
      }}>{#if $page.data.locale === 'fr'}Voir la distinction{:else}View distinction{/if} <span>↗</span></button>
    </aside>
    {/if}
  </figure>
</a>

<style lang="scss">
  a {
    // &:hover,
    // &:focus {
    //   :global(video) {
    //     opacity: 1;
    //   }
    // }
  }
  figure {
    display: block;
    position: relative;
    height: 50vh;
    background-color: $black;

    :global(img),
    :global(video) {
      height: 50vh;
      object-fit: cover;
      position: relative;
      z-index: var(--index);
      background-color: $black;
    }

    :global(video) {
      // position: absolute;
      // top: 0;
      // left: 0;
      // width: 100%;
      // height: 100%;
      // z-index: var(--index);
      // opacity: 0;
      // transition: opacity 333ms;
      // will-change: opacity;
    }

    @media (min-width: $mobile) {
      filter: blur(0.0001px);
    }

    &:not(.full) {
      @media (max-width: $mobile) {
        margin-bottom: 50vh;

        figcaption {
          top: 100%;
          bottom: auto;
          color: var(--foreground);
        }
      }

      &:after {
        // content: "";
        // pointer-events: none;
        // display: block;
        // height: 50vh;
        // width: 100%;
        // background-color: var(--background);

        // @media (min-width: $mobile) {
        //   position: absolute;
        //   bottom: 100%;
        //   left: 0;
        // }
      }
    }

    &.full {
      height: 100vh;

      :global(img),
      :global(video) {
        height: 100vh;
      }
    }
    
    aside {
      position: absolute;
      z-index: 3;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: $base;

      @media (max-width: $mobile) {
        order: -1;
        padding: ($mobile_base) ($mobile_base * 0.5);
      }

      button {
        padding: ($base * $scale * 0.25) ($base * $scale * 0.5);
        
        span {
          margin-left: $base * 0.25;
        }
      }

      @media (max-width: $mobile) {
        bottom: auto;
        top: $base * 2.5;

        button {
          span {
            display: inline-block;
            transform: rotate(90deg);
          }
        }
      }
    }

    figcaption {
      position: -webkit-sticky;
      position: sticky;
      z-index: var(--index);
      bottom: calc(50% - ($type * 3.5));
      color: var(--foreground-inverse);
      padding: $base 0;

      :global(.films) & {
        color: var(--foreground);
      }

      display: flex;
      flex-wrap: wrap;
      align-items: center;

      @media (max-width: $mobile) {
        position: absolute;
        width: 100%;
        bottom: calc(50% - ($type * 2));
        padding: ($mobile_base * 0.5) 0;
      }

      h6 {
        width: 40%;
        padding: 0 $base;

        @media (max-width: $mobile) {
          padding: 0 ($mobile_base * 0.5);
        }

        &:last-child {
          width: 20%;
          text-align: right;
        }

        @media (max-width: $mobile) {
          width: 50%;

          &:last-child {
            width: 50%;
          }

          &:nth-of-type(1) {
            // order: -1;
            width: 100%;
          }
        }
      }

      &.popup {
        position: absolute;
        bottom: 0;
        padding: $base;
        // background-color: fade-out($white, 0.75);
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);

        align-items: stretch;
        min-height: 50vh;

        @media (max-width: $mobile) {
          top: $base * 3;
          bottom: auto;
          padding: $mobile_base;
        }

        > div {
          flex: 1;

          @media (max-width: $mobile) {
            flex: none;
            width: 100%;
          }

          display: flex;
          flex-direction: column;

          &:first-child {
            border-right: 1px solid fade-out($white, 0.75);
            margin-right: $base;

            @media (max-width: $mobile) {
              border-right: none;
            }
          }

          :global(p) {
            margin-bottom: $base * 0.5;
          }

          h4.title {
            margin-bottom: auto;
            width: 70%;
          }

          h5 {
            margin-bottom: 100%;
            opacity: 0.5;

            @media (max-width: $mobile) {
              margin-bottom: 0;
            }
          }

          footer {
            margin-top: auto;
          }
        }

        > button {
          position: absolute;
          padding: $base;
          top: 0;
          right: 0;

          background-color: transparent;

          svg path:first-child {
            fill: white;
          }
        }
      }
    }
  }
</style>