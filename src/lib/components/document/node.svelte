<script lang="ts">
  // import Gallery from '../Gallery.svelte'
  import Media from '../Media.svelte'
  import Mark from './mark.svelte'

  import { page } from '$app/stores'

  import type { TopLevelBlock } from '@contentful/rich-text-types'
  export let node: TopLevelBlock
</script>

{#if node.nodeType === 'heading-2'}
  <h2>{#each node.content as mark}<Mark mark={mark} />{/each}</h2>
{:else if node.nodeType === 'heading-4'}
  <h4>{#each node.content as mark}<Mark mark={mark} />{/each}</h4>
{:else if node.nodeType === 'heading-6'}
  <h6>{#each node.content as mark}<Mark mark={mark} />{/each}</h6>
{:else if node.nodeType === 'paragraph'}
  <p>{#each node.content as mark}<Mark mark={mark} />{/each}</p>
{:else if node.nodeType === 'hr'}
  <hr />

{:else if node.nodeType === 'unordered-list'}
  <ul>
    {#each node.content as item}<li>{#each item.content as node}<svelte:self node={node} />{/each}</li>{/each}
  </ul>

{:else if node.nodeType === 'table'}
  <table>
    {#each node.content as item}<tr>{#each item.content as node}<svelte:self node={node} />{/each}</tr>{/each}
  </table>
{:else if node.nodeType === 'table-header-cell'}
  <th data-content="{node.content[0]?.content[0]?.value}">{#each node.content as item}<svelte:self node={item} />{/each}</th>
{:else if node.nodeType === 'table-cell'}
  <td>{#each node.content as item}<svelte:self node={item} />{/each}</td>

{:else if node.nodeType === 'blockquote'}
  <blockquote>{#each node.content as code}<svelte:self node={code} />{/each}</blockquote>

{:else if node.nodeType === 'embedded-asset-block'}
<Media media={node.data.target} />
{:else if node.nodeType === 'embedded-entry-block'}
  <!-- {#if node.data.target.sys.contentType.sys.id === 'collaboratorSlider'}
  {#if !$page.data.isMobile}
  <Gallery images={node.data.target.fields.collaborators.map(collaborator => ({
    thumbnail: collaborator.fields.photo,
    content: collaborator.fields,
    href: collaborator.fields.tagIdentifier && `films?director=${collaborator.fields.tagIdentifier}`
  }))}>
    <h6 slot="content" let:content={content}>
      {#if content.tagIdentifier}<a href={`films?director=${content.tagIdentifier}`}>{content.name}</a>{:else}{content.name}{/if}<br />
      {content.profession}<br />
    </h6>
  </Gallery>
  {:else}
  <div style="margin: 2rem 0">
  {#each node.data.target.fields.collaborators as collaborator}
  <a href="{collaborator.fields.tagIdentifier && `films?director=${collaborator.fields.tagIdentifier}`}">
    <h2>{collaborator.fields.name}</h2>
  </a>
  {/each}
  </div>
  {/if}
  {/if} -->
{/if}