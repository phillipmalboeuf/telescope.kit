<script lang="ts">
  import Hover from './Hover.svelte'

  const links = [
    { label: 'Films', path: '/films' },
    { label: 'Nouvelles', path: '/articles' },
    { label: 'À propos', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ]

  let visible = false
</script>

<header class:visible>
  <a href="/" on:click={() => visible = false}><h4><Hover texts={['Telesocpe']} /></h4></a>

  <button on:click={() => visible = !visible}>
    {#if !visible}
    <svg xmlns="http://www.w3.org/2000/svg" width="46.5" height="17.35" viewBox="0 0 46.5 17.35">
      <g id="Menu_Burger" data-name="Menu Burger" transform="translate(0 1.2)">
        <line id="Line_1" data-name="Line 1" x2="46.5" fill="none" stroke="currentColor" stroke-width="2.4"/>
        <line id="Line_4" data-name="Line 4" x2="46.5" transform="translate(0 7.483)" fill="none" stroke="currentColor" stroke-width="2.4"/>
        <line id="Line_5" data-name="Line 5" x2="46.5" transform="translate(0 14.95)" fill="none" stroke="currentColor" stroke-width="2.4"/>
      </g>
    </svg>
    {:else}
    <svg xmlns="http://www.w3.org/2000/svg" width="46.749" height="17.38" viewBox="0 0 46.749 17.38">
      <line id="Line_1" data-name="Line 1" x2="46" y2="14.85" transform="translate(0.374 1.29)" fill="none" stroke="currentColor" stroke-width="2.4"/>
      <line id="Line_5" data-name="Line 5" y1="15.1" x2="46" transform="translate(0.374 1.14)" fill="none" stroke="currentColor" stroke-width="2.4"/>
    </svg>
    {/if}
  </button>

  <nav>
    {#each links as link}
    <a href={link.path} on:click={() => visible = false}><h4>{link.label}</h4></a>
    {/each}
    <a href="/en" on:click={() => visible = false}><h4>English</h4></a>
  </nav>
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
    // justify-content: space-between;

    :global(.dark) & {
      color: white;
    }

    > a {
      position: relative;
      z-index: 2;
      flex: 1;
      :global(div) {
        display: inline-block;
        text-align: left;
      }
    }

    > button {
      padding: 0;
      position: relative;
      z-index: 2;
      display: none;

      @media (max-width: 900px) {
        display: inline-block;
      }
    }

    nav {
      flex: 2;
      display: flex;
      // justify-content: space-between;

      a {
        flex: 1;
      }

      a:hover,
      a:focus,
      a.current {
        h4 {
          // font-variation-settings: "wdth" 285;
        }
      }

      @media (max-width: 900px) {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: var(--height);
        color: white;
        background-color: black;
        padding: calc(var(--gutter) * 5) calc(var(--gutter)/2);
        transform: translateY(-100%);
        transition: transform 666ms;

        flex-direction: column;
        justify-content: start;
        gap: calc(var(--rythm) / 2);

        a {
          flex: none;
        }
      }
    }

    &.visible {
      @media (max-width: 900px) {
        > a,
        > button {
          color: white;
        }

        nav {
          transform: translateY(0);
        }
      }
    }
  }
</style>