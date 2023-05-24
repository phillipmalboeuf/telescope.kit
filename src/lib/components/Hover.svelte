<script>
  import { onMount } from 'svelte'
  import { interpolate, interpolateBasis } from 'd3-interpolate'

  export let text = undefined
  export let texts = undefined
  let variants
  let size

  let x
  let y
  let wdth
  let wght

  let element

  let widthInterpolator = interpolate('140 600 900 600 140', '900 700 500 300 100')
  let weightInterpolator = interpolate('40 160 40', '160 100 40')
  
  function move(e) {
    x = e.layerX / size.w
    y = e.layerY / size.h

    wdth = widthInterpolator(Math.abs((x * 2) - 1)).split(' ')
    if (x > 0.5) {
      wdth.reverse()
    }

    wght = weightInterpolator(Math.abs((y * 2) - 1)).split(' ')
    if (y > 0.5) {
      wght.reverse()
    }

    variants = {
      wdth: interpolateBasis(wdth),
      wght: interpolateBasis(wght)
    }
  }

  onMount(() => {
    size = {
      w: element.offsetWidth,
      h: element.offsetHeight
    }
  })
</script>

<style>
  div {
    position: relative;
    text-align: center;
  }
</style>



<div on:pointermove={move} on:mousemove={move} bind:this={element}>
  {#if texts}

  {#each texts as t, i}
    {#each t as letter, index}
    {#if variants}
    <span style='font-variation-settings: "wdth" {variants.wdth(index / (t.length - 1))}, "wght" {variants.wght(i / (texts.length - 1))}'>{letter}</span>
    {:else}
    <span style='font-variation-settings: "wdth" 500, "wght" 80'>{letter}</span>
    {/if}
    {/each}
    <br />
  {/each}


  {:else}
  {#each text as letter, index}
  <span style='font-variation-settings: "wdth" {x 
    ? 700 * ((text.length - Math.abs(index - (x * text.length))) / text.length)
    : 400}, "wght" {x 
    ? 160 * ((text.length - Math.abs(index - (x * text.length))) / (text.length))
    : 40}'>{letter}</span>
  {/each}
  {/if}
</div>