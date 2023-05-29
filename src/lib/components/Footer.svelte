<script lang="ts">
  import Hover from './Hover.svelte'

  const links = [
    { label: 'Instagram', path: 'https://www.instagram.com/telescope_films/' },
    { label: 'Facebook', path: 'https://www.facebook.com/telescopefilms' },
    { label: 'Vimeo', path: '/films' },
  ]
</script>

<h1>
  <Hover texts={['TELESCOPE']} />
</h1>

<footer>
  <a href="/"><small>© 2023 Télescope</small></a>

  <nav>
    {#each links as link}
    <a href={link.path} rel="external"><small>{link.label}</small></a>
    {/each}
    <a href="/en"><small>English</small></a>
  </nav>
</footer>

<style lang="scss">
  h1 {
		margin-top: calc(var(--gutter) * 1);
		text-align: center;
	}

	@media (max-width: 900px) {
    h1 {
      font-size: 6.33vw;
    }
  }
  
  footer {
    padding: calc(var(--gutter) / 2);
    background-color: white;

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