<script lang="ts">
  import { page } from '$app/stores'
  import Hover from './Hover.svelte'

  const links = [
    { label: 'Instagram', path: 'https://www.instagram.com/telescope_films/' },
    { label: 'Facebook', path: 'https://www.facebook.com/telescopefilms' },
    { label: 'Vimeo', path: 'https://vimeo.com/telescopefilms' },
  ]
</script>

<section>
  <h1>
    <Hover texts={['TELESCOPE']} />
  </h1>

  <footer>
    <a href={`${$page.data.locale === 'fr' ? '/' : `/${$page.data.locale}`}`}><small>© 2023 Télescope</small></a>

    <nav>
      <div>
      {#each links as link}
      <a href={`${$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}${link.path}`} rel="external"><small>{link.label}</small></a>
      {/each}
      </div>

      {#if $page.data.locale === 'fr'}
      <a href="/en"><small>English</small></a>
      {:else}
      <a href="/"><small>Français</small></a>
      {/if}
    </nav>
  </footer>
</section>

<style lang="scss">
  h1 {
		text-align: center;
	}

	@media (max-width: 900px) {
    h1 {
      font-size: 6.33vw;
    }
  }

  section {
    position: relative;
    z-index: 22;
    padding: calc(var(--gutter) / 2);
    margin-top: calc(var(--gutter) * 1);
    background-color: white;

    :global(.dark) & {
      @supports (mix-blend-mode: exclusion) {
        background-color: transparent;
        color: white;
        mix-blend-mode: exclusion;
      }
    }
  }
  
  footer {
    display: flex;

    a {
      opacity: 0.4;
      transition: opacity 333ms;

      &:hover,
      &:focus {
        opacity: 1;
      }
    }

    > a {
      flex: 1;
    }

    > nav {
      flex: 2;
      display: flex;
      justify-content: space-between;

      > div {
        flex: 3;
        display: flex;
        gap: var(--gutter);

        @media (max-width: 900px) {
          justify-content: end;
        }
      }

      > a {
        flex: 1;
        text-align: right;

        @media (max-width: 900px) {
          display: none;
        }
      }
    }
  }
</style>