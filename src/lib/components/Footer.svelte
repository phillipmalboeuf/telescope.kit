<script lang="ts">
  import Logo from './Logo.svelte'

  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { goto, preloadData, pushState } from '$app/navigation'

  export let footer: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
</script>

<footer>
  <nav>
    {#each footer?.fields.links as link, i}
    <div>
      <a href={link.fields.link} {...link.fields.external && { rel: "external", target: "_blank" }}>{link.fields.label}</a>

      {#if link.fields.subLinks}
      <ul class="small">
      {#each link.fields.subLinks as sublink}
        <li>
          <a href={sublink.fields.link} {...sublink.fields.external && { rel: "external", target: "_blank" }}
            on:click={async (e) => {
              if (sublink.fields.link !== '/contact' && sublink.fields.link !== '/pages/about') return;
              if (e.metaKey) return;

              e.preventDefault()
              const { href } = e.currentTarget
              const result = await preloadData(href)

              if (result.type === 'loaded' && result.status === 200) {
                pushState(href, { type: sublink.fields.link.includes('pages') ? 'page' : 'contact', open: result.data })
              } else {
                goto(href)
              }
            }}>{@html sublink.fields.label.replaceAll('\\n', '<br>')}</a>
        </li>
      {/each}
      </ul>
      {/if}

      {#if i === footer.fields.links.length - 1}
      <aside class="small">
        <span>© 2023 Telescope</span>
        <a href="http://caserne.com" target="_blank" rel="external">Web Design <strong>Caserne</strong></a>
      </aside>
      {/if}
    </div>
    {/each}
  </nav>

  <Logo />
</footer>

<style lang="scss">
  footer {
    position: relative;
    z-index: 999;
    color: var(--foreground-inverse);
    background-color: var(--background-inverse);
    padding: $base;

    display: flex;
    flex-direction: column;
    gap: $base;

    @media (max-width: $mobile) {
      padding: $mobile_base;
      gap: $mobile_base * $mobile_scale * 2;
    }
    
    > :global(svg) {
      width: 100%;
      height: auto;

      @media (max-width: $mobile) {
        order: -1;
      }
    }

    nav {
      display: flex;
      flex-wrap: wrap;

      a {
        transition: color 333ms;
        
        &:hover,
        &:focus {
          color: var(--foreground-inverse);
        }
      }

      div {
        flex: 1;

        min-height: max(20vh, 20vw);
        display: flex;
        flex-direction: column;
        margin-bottom: $gap;

        &:not(:first-child) {
          padding-left: $base;
          border-left: 1px solid $grey;
        }

        &:last-child {
          flex: 2;

          @media (min-width: $mobile) {
            ul {
              display: flex;
              flex-wrap: wrap;
              align-items: flex-start;

              li {
                width: 50%;

                &:nth-child(n + 3) {
                  margin-left: 50%;
                }
              }
            }
          }
        }

        @media (max-width: $mobile) {
          flex: none !important;
          width: 50%;
          margin-bottom: 0;

          &:not(:first-child) {
            padding-left: $mobile_base;
          }

          &:first-child {
            display: none;
          }

          &:last-child {
            width: 100%;
          }
        }

        ul {
          list-style: none;
          margin: $gap 0;

          color: $grey;
        }

        aside {
          color: $grey;
          display: flex;
          justify-content: space-between;
          margin-top: auto;

          a {
            strong {
              font-weight: normal;
              color: var(--foreground-inverse);
              transition: color 333ms;
            }

            &:hover,
            &:focus {
              color: var(--foreground-inverse);

              strong {
                color: $grey;
              }
            }
          }
        }
      }
    }
  }
</style>