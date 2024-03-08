<script lang="ts">
  import { page } from '$app/stores'
  import { fade, fly } from 'svelte/transition'
  import { goto, preloadData, pushState } from '$app/navigation'

  import type { TypeFilmSkeleton, TypeLooseTextSkeleton, TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Asset, Entry } from 'contentful'
  
  import { api } from '$lib/api'
  import { collides } from '$lib/collides'
  import Media from './Media.svelte'
  
  export let header: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">

  let visible = false

  let films = false
  let directors = false

  let visibleMedia: {
    media: Asset<"WITHOUT_UNRESOLVABLE_LINKS">
    poster: Asset<"WITHOUT_UNRESOLVABLE_LINKS">
  }
  // let visiblePosition: {
  //   top: number
  //   left: number
  // }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<header class:visible on:mouseleave={() => visible = false}>
  <nav style="--length: {header.fields.links.length}">
    {#each header.fields.links as link}
    <div>
      <a href="{(link.fields.external || $page.data.locale === 'fr') ? '' : `/${$page.data.locale}`}{link.fields.link}" {...link.fields.external && { rel: "external", target: "_blank" }}
        class:active={$page.url.pathname !== '/' && link.fields.link !== '/' && $page.url.pathname.startsWith(link.fields.link)}
        on:click={async (e) => {
          visible = false
          films = false
          directors = false

          if (link.fields.link !== '/contact' && link.fields.link !== '/pages/about') return;
          if (e.metaKey) return;

          e.preventDefault()
          const { href } = e.currentTarget
          const result = await preloadData(href)

          if (result.type === 'loaded' && result.status === 200) {
            pushState(href, { type: link.fields.link.includes('pages') ? 'page' : 'contact', open: result.data })
          } else {
            goto(href)
          }
        }}
        on:touchstart={(e) => {
          if (["/films", "/directors"].includes(link.fields.link)) {
            e.preventDefault()
            e.stopImmediatePropagation()
          }

          if (link.fields.link === "/films") {
            films = true
            directors = false
          }

          if (link.fields.link === "/directors") {
            directors = true
            films = false
          }
        }}
        on:pointerenter={async () => {
          if ($page.data.device !== 'desktop') return
          visible = true
        }}><span use:collides>{link.fields.label}</span></a>

      {#if $page.data.films && link.fields.link === "/films"}
      <ol class:films>
        {#each $page.data.films as film}
        <li><a
          on:click={() => visible = false}
          href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}/films/{film.fields.identifier}">{film.fields.title}</a></li>
        {/each}
      </ol>
      {/if}

      {#if $page.data.directors && link.fields.link === "/directors"}
      <ol class:directors>
        {#each $page.data.directors as director}
        <li><a
          on:click={() => visible = false}
          on:mouseenter={() => {
            if ($page.data.device !== 'desktop') return
            visibleMedia = {
              media: director.fields.featuredFilm?.fields.teaser,
              poster: director.fields.featuredFilm?.fields.poster
            }
          }}
          on:mouseleave={() => visibleMedia = undefined}
          href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}/directors/{director.fields.tagIdentifier}">{director.fields.name}</a></li>
        {/each}
      </ol>
      {/if}
    </div>
   
    {/each}
    <small>
      {#if $page.data.locale === 'fr'}
      <a href="/en"><small>English</small></a>
      {:else}
      <a href="/"><small>Français</small></a>
      {/if}
    </small>
    <div><button class="button--blur" on:click={()=> {
      visible = !visible
      films = false
      directors = false
    }}>{#if visible}{#if $page.data.locale === 'fr'}Fermer{:else}Close{/if}{:else}Menu{/if}</button></div>
  </nav>

  {#if visibleMedia}
  <figure transition:fade={{ duration: 333 }}>
    <Media media={visibleMedia.media} poster={visibleMedia.poster} small eager background />
  </figure>
  {/if}
</header>

<style lang="scss">
  header {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100vw;
    max-height: 100vh;
    overflow-y: auto;
    padding: $base 0;
    background-color: fade-out($white, 1);
    transition: height 666ms, background-color 666ms, -webkit-backdrop-filter 666ms, backdrop-filter 666ms;
    pointer-events: none;

    &:not(.visible) {
      :global(.collides) {
        color: $white !important;
      }
      // @supports (mix-blend-mode: exclusion) {
      //   color: white;
      //   mix-blend-mode: exclusion;
      // }
    }

    nav {
      display: flex;
      flex-wrap: wrap;

      &:has(a.active) a:not(.active) {
        opacity: 0.4;

        &:hover,
        &:focus {
          opacity: 1;
        }
      }

      &:not(:has(a.active)) a {
        opacity: 1 !important;

        &:hover,
        &:focus {
          opacity: 0.4 !important;
        }
      }

      a, button {
        pointer-events: auto;
      }

      a {
        transition: opacity 333ms;

        &.active {
          opacity: 1 !important;

          &:hover,
          &:focus {
            opacity: 0.4 !important;
          }

          + ol {
            a {
              opacity: 1 !important;

              &:hover,
              &:focus {
                opacity: 0.4 !important;
              }
            }
          }
        }
      }

      ol {
        opacity: 0.1;
        visibility: hidden;
        transition: opacity 666ms;

        margin-top: $gap * 1.5;
        list-style: none;
        
        li {
          margin-bottom: $base * 0.5;
        }
      }

      div {
        width: calc(100% / var(--length));
        transition: border-color 666ms;
        padding: 0 ($base * 0.75);
        
        &:not(:first-child):not(:last-child) {
          border-left: 1px solid transparent;
        }

        &:nth-child(4) {
          // margin-left: calc(50% / var(--length));
        }

        &:nth-last-child(3) {
          border-color: transparent !important;
        }

        &:nth-child(n + 4) a {
          visibility: hidden;
          opacity: 0;
        }

        &:last-child {
          position: absolute;
          width: auto;
          top: $base * 0.83333333;
          right: 0;
        }

        @media (max-width: $mobile) {
          &:first-child {
            a {
              opacity: 1 !important;
            }
          }
        }
      }

      // div {
      //   position: absolute;
      //   top: $base - ($base * $scale * 0.125);
      //   right: $base - ($base * $scale * 0.333);
      // }
    }

    small {
      display: none;
      padding: 0 ($base * 0.75);

      @media (max-width: $mobile) {
        padding: 0 ($mobile_base * 0.5);
      }
    }

    @media (max-width: $mobile) {
      padding: $mobile_base 0;

      a {
        font-size: $mobile_base * $mobile_scale * 1.15;
      }

      small a {
        font-size: $mobile_base * $mobile_scale;
      }

      button {
        font-size: $mobile_base * $mobile_scale;
      }

      &:not(.visible) {
        nav > div {
          &:not(:first-child):not(:last-child) { display: none; }
        }
      }
    }

    &.visible {
      background-color: fade-out($white, 0.5);
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      pointer-events: auto;

      :global(html:has(.films)) & {
        background-color: fade-out($black-light, 0.5);
      }

      @media (min-width: $mobile) {
        small {
          font-size: $base;
          display: block;
          position: absolute;
          bottom: $base * 0.5;
          right: 0;
        }
      }

      @media (max-width: $mobile) {
        small {
          display: block;
          margin-top: auto;
        }

        nav {
          min-height: 66vh;
          flex-direction: column;
          gap: $base * 0.5;
        }
      }

      ol:hover,
      ol:has(a[focus]),
      a:focus:has(+ ol) + ol,
      a:hover:has(+ ol) + ol,
      a.active:has(+ ol) + ol {
        opacity: 1;
      }

      ol {
        // opacity: 1;
        visibility: visible;

        @media (max-width: $mobile) {
          display: none;

          &.films,
          &.directors {
            display: block;
            font-size: $mobile_base;
            position: absolute;
            top: $mobile_base * $mobile_scale * 2.15;
            right: 0;
            bottom: $mobile_base;
            border-left: 1px solid;
            padding-left: $mobile_base;;
            width: 50%;
            overflow-y: auto;

            li {
              margin-bottom: $mobile_base * 0.5;

              a {
                font-size: $mobile_base;
              }
            }
          }
        }
      }

      nav div {
        &:first-child {
          @media (max-width: $mobile) {
            margin-bottom: $mobile_base * $mobile_scale * 2;
          }
        }
        &:not(:first-child) {
          border-color: fade-out($color: $black, $amount: 0.75);

          :global(html:has(.films)) & {
            border-color: fade-out($color: $white, $amount: 0.75);
          }

          @media (max-width: $mobile) {
            border: none !important;

            &:not(:last-child) {
              width: 100%;
            }
          }
        }

        &:nth-child(n + 4) a {
          visibility: visible;
        }
      }
    }

    figure {
      position: absolute;
      top: $base * 4;
      left: calc(60% + $base);
      width: 25vw;
      height: calc(25vw * 0.5625);
      background-color: $black;

      overflow: hidden;
      // border-radius: $base * 0.5;
      // transform: translate(-50%, 15%);

      :global(video) {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>