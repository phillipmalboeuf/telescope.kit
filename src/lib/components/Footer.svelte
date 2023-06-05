<script lang="ts">
  import { page } from '$app/stores'
  import Hover from './Hover.svelte'

  const links = [
    { label: 'Instagram', path: 'https://www.instagram.com/telescope_films/' },
    { label: 'Facebook', path: 'https://www.facebook.com/telescopefilms' },
    { label: 'Vimeo', path: 'https://vimeo.com/telescopefilms' },
  ]
</script>

<h1>
  <Hover texts={['TELESCOPE']} />
</h1>

<footer>
  <a href={`${$page.data.locale === 'fr' ? '/' : `/${$page.data.locale}`}`}><small>© 2023 Télescope</small></a>

  <nav>
    {#each links as link}
    <a href={`${$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}${link.path}`} rel="external"><small>{link.label}</small></a>
    {/each}
    {#if $page.data.locale === 'fr'}
    <a href="/en"><small>English</small></a>
    {:else}
    <a href="/"><small>Français</small></a>
    {/if}
  </nav>
</footer>

<style lang="scss">
  h1 {
		margin-top: calc(var(--gutter) * 1);
		text-align: center;

    :global(.dark) & {
      color: white;
    }

    @supports (mix-blend-mode: exclusion) {
      color: white;
      mix-blend-mode: exclusion;
    }
	}

	@media (max-width: 900px) {
    h1 {
      font-size: 6.33vw;
    }
  }
  
  footer {
    padding: calc(var(--gutter) / 2);
    // background-color: white;

    :global(.dark) & {
      color: white;
      // background-color: transparent;
    }

    @supports (mix-blend-mode: exclusion) {
      color: white;
      mix-blend-mode: exclusion;
    }

    display: flex;

    > a {
      flex: 1;
    }

    > nav {
      flex: 2;
      display: flex;
      // justify-content: space-between;

      a {
        flex: 1;
      }
    }
  }
</style>