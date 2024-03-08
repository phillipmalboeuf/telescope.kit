<script lang="ts">
  import type { TypeFilmSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { page } from '$app/stores'
  import { year } from '$lib/formatters'

  export let film: Entry<TypeFilmSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

{#if film.fields.status}<span class={film.fields.status}>{@html `${{
  'Distribution': $page.data.locale === 'fr' ? 'En&nbsp;distribution' : 'In&nbsp;distribution',
  'Production': $page.data.locale === 'fr' ? 'En&nbsp;production' : 'In&nbsp;production'
}[film.fields.status]}`}</span>{:else if film.fields.publishedDate}{year(film.fields.publishedDate)}{/if}

<style lang="scss">
  .Distribution,
  .Production {
    display: flex;
    gap: $base * 0.5;
    align-items: center;
    // justify-content: flex-end;

    &:before {
      content: "";
      display: inline-block;
      width: $base * 0.5555;
      height: $base * 0.5555;
      border-radius: 50%;
      background-color: $green;
    }
  }
</style>