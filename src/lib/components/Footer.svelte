<script lang="ts">
  const links = [
    { label: 'Instagram', path: '/films' },
    { label: 'Facebook', path: '/about' },
    { label: 'Vimeo', path: '/articles' },
  ]
</script>

<footer>
  <a href="/"><small>© 2023 Télescope</small></a>
  {#each links as link}
  <a href={link.path}><small>{link.label}</small></a>
  {/each}
  <a href="/en"><small>English</small></a>
</footer>

<style lang="scss">
  footer {
    padding: calc(var(--gutter) / 2);
    background-color: white;

    display: flex;
    justify-content: space-between;

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