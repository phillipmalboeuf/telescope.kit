<script lang="ts">
  import { page } from '$app/stores'
  
  let hovering = false
  let x: number
  let y: number
</script>

<svelte:document on:mousemove={(e) => {
  if ($page.data.device !== 'desktop') return

  // @ts-ignore
  if (!hovering && ['BUTTON', 'A', 'VIDEO'].includes(e.target.nodeName)) {
    hovering = true

  // @ts-ignore
  } else if (hovering && !['BUTTON', 'A', 'VIDEO'].includes(e.target.nodeName)) {
    hovering = false
  }

  x = e.clientX
  y = e.clientY
}} />

{#if x}
<figure style:left={`${x}px`} style:top={`${y}px`} class:hovering />
{/if}

<style lang="scss">
  figure {
    position: fixed;
    z-index: 6666;
    width: $base * $scale; 
    height: $base * $scale;
    border-radius: 50%;
    background-color: black;
    transform: translate(-50%, -50%);
    transition: transform 666ms, border-radius 666ms;
    pointer-events: none;

    @supports (mix-blend-mode: exclusion) {
      background-color: white;
      mix-blend-mode: exclusion;
    }

    &.hovering {
      transform: translate(-50%, -50%) scale(0.88);
      // border-radius: 25%;
    }
  }
</style>