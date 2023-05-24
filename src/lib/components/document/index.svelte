<script>
  import Node from './node.svelte'

  export let body
</script>

{#each body.content as node}
<Node node={node} />
{/each}