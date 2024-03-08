<script lang="ts">
  import { isTypeFilm, isTypeLooseText, type TypeAboutPieceSkeleton, type TypeArticleSkeleton, type TypeCollaboratorSkeleton, type TypeCollaboratorSliderSkeleton, type TypeContactPersonSkeleton, type TypeContactPointSkeleton, type TypeFilmSkeleton, type TypeLooseTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import ListFilm from './ListFilm.svelte'
  import Document from './document/index.svelte'

  export let query: string = undefined
  export let content: Entry<TypeAboutPieceSkeleton | TypeArticleSkeleton | TypeCollaboratorSkeleton | TypeCollaboratorSliderSkeleton | TypeContactPersonSkeleton | TypeContactPointSkeleton | TypeFilmSkeleton | TypeLooseTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]
</script>

<ol>
{#each content as item, i (item.sys.id)}
  {#if isTypeFilm(item)}
  <li class:full={item.fields.full} style="--index: {i}; --index-reverse: {content.length - i}">
    <ListFilm {i} film={item} full={item.fields.full} />
  </li>
  {:else if isTypeLooseText(item)}
  <li class="wide">
    <Document body={item.fields.body} />
  </li>
  {/if}
{/each}
</ol>

<style lang="scss">
  ol {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;

    // @media (max-width: $mobile) {
    //   &:has(.full) {
        
    //     height: 100vh;
    //     overflow-y: auto;
    //   }
    // }

    @media (max-width: $mobile) {
      &:after {
        content: "";
        scroll-snap-align: start;
      }
    }

    li {
      width: 50%;

      @media (max-width: $mobile) {
        width: 100%;
        scroll-snap-align: start;
      }

      &.wide {
        width: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: $base;

        > :global(p) {
          max-width: $max;
        }
      }
    }
  }
</style>