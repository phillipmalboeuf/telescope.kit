<script lang="ts">
  import type { Entry, EntryCollection } from 'contentful'
  import type { TypeFilmSkeleton } from '$lib/clients/content_types'
  import { api } from '$lib/api';
  import { date, year } from '$lib/formatters'
  import { goto, preloadData, pushState } from '$app/navigation'

  import { page } from '$app/stores'
  import TooLong from './TooLong.svelte';

  export let labels: {
    open: string
    close: string
  }

  export let columns: {
    key: string
    label: string
  }[]

  export let director: string = undefined
  export let tag: string = undefined

  let open = false
  let data: EntryCollection<TypeFilmSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> = undefined
  let filter: string = undefined
  let tags: string[] = undefined
  let items: Entry<TypeFilmSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]
  let more = false
  const moreLimit = 12
  
  const out = ["recent","Recent","SERVICING","martin-c-pariseau","vincent-lortie","brittney-canda","jf-sauve","kristof-brandl","phil-chagnon","jb-proulx", "2017","2018","2019","2020","2021","2022"]

  $: { items = data?.items.filter(film => filter ? film.fields.tags?.map(tag => tag.toLowerCase()).includes(filter) : true) }
</script>

<section>
  <nav>
    <button on:click={async () => {
      open = !open

      // @ts-ignore
      data = await api.get(`/films${director ? `?director=${director}` : ''}${tag ? `?tag=${tag}` : ''}`)
      tags = [...new Set(data.items.reduce((ts, item)=> {
        return [
          ...ts,
          ...item.fields.tags ? item.fields.tags.filter(tag => !out.includes(tag)).map(tag => tag.toLowerCase()) : []
        ]
      }, []))].sort()
    }}><h2>{#if open}{labels.close}{:else}{labels.open}{/if}</h2></button>

    <div>
    {#if open && tags}
    <button class:active={!filter} on:click={() => filter = undefined}>Tous</button>
    {#each tags as tag}
    <button class:active={tag === filter} on:click={() => filter = tag}>{tag}</button>
    {/each}
    {/if}
    </div>
  </nav>

  {#if open}
  <table style="--length: {columns.length}">
    <tr>
      {#if data}
      {#each columns as column}
      <th>{column.label}</th>
      {/each}
      {:else}
      <th>Un instant...</th>
      {/if}
    </tr>

    {#if data}
    <tr>
      <th colspan={columns.length}><hr></th>
    </tr>

    {#each items.filter((_, i) => more || i < moreLimit) as film, i}
    <tr on:click={async (e) => {
      if (e.metaKey) return;

      e.preventDefault()
      const href = `${$page.data.locale === 'fr' ? `/films/${film.fields.identifier}` : `/${$page.data.locale}/films/${film.fields.identifier}`}`
      const result = await preloadData(href)

      if (result.type === 'loaded' && result.status === 200) {
        pushState(href, { type: 'film', open: result.data })
      } else {
        goto(href)
      }
    }}>
      {#each columns as column, i}
      <td>
        {#if column.key === 'tags' && film.fields.tags}
        {film.fields.tags.filter(tag => !out.includes(tag)).join(' ')}
        {:else if column.key === 'ralisateur' && film.fields.director}
        {film.fields.director.fields.name}
        {:else if column.key.includes('Date')}
        {film.fields[column.key] ? year(film.fields[column.key]) : '–'}
        {:else}
        {#if i === 0}
        <a
          href={`${$page.data.locale === 'fr' ? `/films/${film.fields.identifier}` : `/${$page.data.locale}/films/${film.fields.identifier}`}`}><TooLong content={film.fields[column.key]} hoverable /></a>
        {:else}
        {film.fields[column.key] ? film.fields[column.key] : '–'}
        {/if}
        {/if}
      </td>
      {/each}
    </tr>
    {/each}
    {/if}
    {#if !more && items && items.length > moreLimit}
    <tr>
      <td colspan={columns.length}><button on:click={() => more = true}>{$page.data.locale === 'fr' ? 'En voir plus' : 'See more'}</button></td>
    </tr>
    {/if}
  </table>
  {/if}
</section>

<style lang="scss">
  section {
    padding: $base;
    position: relative;
    z-index: 998;
    background-color: $white;

    @media (max-width: $mobile) {
      padding: $mobile_base;
    }

    button:has(h2) {
      background-color: transparent !important;
      text-align: left;
      padding: 0;
      transition: color 333ms;

      &:hover,
      &:focus {
        color: $grey;
      }
    }

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: $gap;

      @media (max-width: $mobile) {
        flex-direction: column;
        align-items: flex-start;
      }

      > div {
        display: flex;
        flex-wrap: wrap;
        gap: $base * 0.5;

        button {
          background-color: $grey-light;
          text-transform: capitalize;

          &.active {
            color: $white;
            background-color: $black;
          }
        }
      }
    }

    nav,
    table {
      margin-bottom: $gap;
    }

    table {
      table-layout: fixed;
      width: 100%;
      border-collapse: collapse;
      margin-top: $gap * 3;

      hr {
        margin: ($base * 0.5) 0 ($base * 0.5);
      }

      th, td {
        width: calc(100% / var(--length));
      }

      th {
        text-align: left;
        padding: ($base * 0.25) 0;
        // border-bottom: 1px solid;
        // padding: $base 0;
      }

      td {
        padding: ($base * 0.1) 0;
        text-transform: capitalize;

        :global(.marquee-container) {
          margin-right: $base * 0.5;
        }

        &:has(button) {
          padding: ($base * 0.5) 0;
        }
      }

      tr:not(:has(> th)):not(:has(button)):hover,
      tr:has(a:focus) {
        background-color: $grey-light;
      }

      @media (max-width: $mobile) {
        display: flex;
        flex-direction: column;
        margin-top: $gap;
        
        tr {
          padding: ($mobile_base * 0.25) 0 ($mobile_base * 0.5);
          border-top: 1px solid;
          display: flex;
          align-items: center;
          flex-wrap: wrap;

          &:has(th) {
            display: none;
          }

          td {
            font-size: $mobile_base;
            width: 50%;

            &:first-child {
              order: -2;
            }

            &:nth-child(3) {
              order: -1;
            }

            &:last-child {
              display: none;
            }
          }
        }
      }
    }

    :global(.films) & {
      color: $white;
      background-color: $black-light;

      button {
        color: $white;
        background-color: $grey-dark;

        &.active {
          color: $black;
          background-color: $white;
        }
      }

      tr:not(:has(> th)):hover,
      tr:has(a:focus) {
        background-color: $grey-dark;
      }
    }
  }
</style>