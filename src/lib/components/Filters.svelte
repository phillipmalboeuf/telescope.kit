<script lang="ts">
  import { page } from '$app/stores'
  
	import Tag from './Tag.svelte'
	export let path: string
	export let all: string = undefined
	export let currentTag: string = undefined
  export let currentCollaborator: string = undefined

  let showTags = false
  let showCollaborators = false

  let contentTags = $page.data.tags.reduce((contentTags, tag) => {
    return { ...contentTags, [tag.fields.identifier]: tag.fields }
  }, {})

  function toggleTags() {
    showTags = !showTags
    showCollaborators = false
  }

  function toggleCollaborators() {
    showCollaborators = !showCollaborators
    showTags = false
  }
</script>

<style>
	nav {
		display: flex;
		flex-wrap: wrap;
		margin: calc(var(--rythm) * -2.5) 0 calc(var(--rythm) * 1) calc(var(--rythm) / -2);
	}

		nav a,
    nav > span {
      cursor: pointer;
			opacity: 0.35;
      display: inline-block;
			padding: calc(var(--rythm) / 2);
		}

      nav a:hover,
      nav a:focus,
      nav > span:hover {
        opacity: 1;
      }

        nav a:hover h6,
        nav a:focus h6,
        nav > span:hover h6 {
          font-variation-settings: "wdth" 235;
        }

		nav a.current,
    nav > span.current {
			opacity: 1;
		}

    nav > div {
      width: 100%;
    }

  @media (max-width: 1200px) {
		nav {
			margin-top: calc(var(--rythm) * -1.5);
		}
	}
		
	@media (max-width: 900px) {
		nav {
			margin-top: calc(var(--rythm) * -0.5);
		}
	}
</style>

<nav>
  <!-- {#if !currentCollaborator}
	<span
    class:current={true}
    on:click={toggleTags}><h6>{#if currentTag}<Tag id={currentTag} />{:else}{all}{/if} {#if showTags}<span style="display:inline-block;transform:rotate(180deg)">↓</span>{:else}↓{/if}</h6></span>
  {/if}

  {#if !currentTag && tags.filter(([tag, total]) => contentTags[tag] && contentTags[tag].isACollaborator).length}
  <span
    class:current={true}
    on:click={toggleCollaborators}><h6>{#if currentCollaborator}<Tag id={currentCollaborator} />{:else}{$page.data.locale === 'fr-CA' ? 'Tous les réals' : 'All Directors'}{/if} {#if showCollaborators}<span style="display:inline-block;transform:rotate(180deg)">↓</span>{:else}↓{/if}</h6></span>
  {/if}

  {#if showTags}
  <div>
  <a href="{path}{currentCollaborator ? `?director=${currentCollaborator}` : ''}" rel=prefetch
    on:click={toggleTags}
    class:current={currentTag === undefined}><h6>{all}</h6></a>

	{#each $page.data.tags as tag}
	{#if tag !== 'recent' && tag.indexOf('20') !== 0}
	<a href="{path}?tag={tag}{currentCollaborator ? `&director=${currentCollaborator}` : ''}" rel=prefetch class:current={tag === currentTag} on:click={toggleTags}><h6><Tag id={tag} /></h6></a> 
	{/if}
	{/each}
  </div>
  {/if}

  {#if showCollaborators}
  <div>
  <a href="{path}{currentTag ? `?tag=${currentTag}` : ''}" rel=prefetch
    class:current={currentCollaborator === undefined} on:click={toggleCollaborators}><h6>{$page.data.locale === 'fr-CA' ? 'Tous les réals' : 'All Directors'}</h6></a>

	{#each $page.data.tags as tag}
	<a href="{path}?director={tag}{currentTag ? `&tag=${currentTag}` : ''}" rel=prefetch class:current={tag === currentCollaborator} on:click={toggleCollaborators}><h6><Tag id={tag} /></h6></a>
	{/each}
  </div>
  {/if} -->
</nav>
