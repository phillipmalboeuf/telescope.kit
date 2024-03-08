<script lang="ts">
  import Node from './node.svelte'
  import type { Document } from '@contentful/rich-text-types'

  export let body: Document
</script>

{#each body.content as node}
<Node node={node} />
{/each}