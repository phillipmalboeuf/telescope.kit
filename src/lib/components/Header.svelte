<script lang="ts">
  const links = [
    { label: 'Films', path: '/films' },
    { label: 'Nouvelles', path: '/articles' },
    { label: 'À propos', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]
</script>

<header>
  <a href="/"><h4>Telescope</h4></a>
  {#each links as link}
  <a href={link.path}><h4>{link.label}</h4></a>
  {/each}
  <a href="/en"><h4>English</h4></a>
</header>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10;
    padding: calc(var(--gutter) / 2);
    // background-color: white;

    display: flex;
    justify-content: space-between;

    :global(.dark) & {
      color: white;
    }

    a {
      flex: 1;
      text-align: right;

      &:first-child {
        flex: 2;
        text-align: left;
      }
    }
  }
</style>