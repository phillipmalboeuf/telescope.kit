<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { page } from '$app/stores'

  import FilmPage from '../../routes/[[locale]]/films/[id]/+page.svelte'
  import ContactPage from '../../routes/[[locale]]/contact/+page.svelte'
  import Page from '../../routes/[[locale]]/pages/[id]/+page.svelte'
</script>

{#if $page.state.open}
<dialog transition:fly={{ opacity: 1, y: {
  'contact': '-100%',
  'page': '-100%'
}[$page.state.type] || '100%', duration: 666 }}>
  {#if $page.state.type === 'film'}
  <FilmPage data={$page.state.open} close />
  {:else if $page.state.type === 'contact'}
  <ContactPage data={$page.state.open} />
  {:else if $page.state.type === 'page'}
  <Page data={$page.state.open} />
  {/if}

  <button class="button--blur" on:click={() => history.back()}>{#if $page.data.locale === 'fr'}Fermer{:else}Close{/if}</button>
</dialog>
{/if}

<style lang="scss">
  dialog {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    overflow-y: auto;
    width: 100vw;
    z-index: 2000;
    border: none;

    color: var(--color);
    background-color: var(--background);

    > button {
      position: fixed;
      top: $base * 0.83333333;
      right: $base;
      z-index: 2002;

      @media (max-width: $mobile) {
        font-size: $mobile_base * $mobile_scale;
        top: $mobile_base;
        right: $mobile_base;
      }
    }
  }
</style>