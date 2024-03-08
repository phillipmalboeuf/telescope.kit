<script>
  import { onMount } from "svelte";
  export let content = "svelte-marquee",
    reverse = true,
    // autoplay = false,
    hoverable = false,
    speed = "medium";

  onMount(() => {
    // this fix a bug on safari and firefox
    // if (autoplay === undefined) {
    //   autoplay = true;
    // }
  });

  let _marqueecontainerWidth, _contentWidth;

  $: _reqR =
    _contentWidth > _marqueecontainerWidth
      ? 1
      : Math.ceil((_marqueecontainerWidth - _contentWidth) / _contentWidth) + 1;

  $: _arr = _reqR && Array.from(Array(_reqR).keys());

  $: _mult =
    speed === "fast"
      ? 0.008
      : speed === "medium"
      ? 0.019
      : speed === "slow"
      ? 0.03
      : 0.019;

  $: _time = _contentWidth * _mult;

  $: _style = _contentWidth > _marqueecontainerWidth && `
    transform: translate(-${_contentWidth}px, 0);
    animation-duration: ${_time}s;
  `;
</script>

<style>
  .marquee-container {
    overflow: hidden;
  }

  .marquee-content {
    position: relative;
    white-space: nowrap;
    /* display: inline-block; */
  }

  /* .no-autoplay {
    -webkit-animation-play-state: paused;
    -moz-animation-play-state: paused;
    -o-animation-play-state: paused;
    animation-play-state: paused;
  }
  .no-autoplay:hover {
    -webkit-animation: marquee linear infinite;
    -moz-animation: marquee linear infinite;
    -o-animation: marquee linear infinite;
    animation: marquee linear infinite;
  }

  .autoplay {
    -webkit-animation: marquee linear infinite;
    -moz-animation: marquee linear infinite;
    -o-animation: marquee linear infinite;
    animation: marquee linear infinite;
  } */

  .hoverable {
    pointer-events: auto !important;
    animation: marquee linear infinite;
    animation-play-state: paused;
  }

  .hoverable:hover {
    animation-play-state: running;
  }

  span {
    font-family: inherit;
    font-size: inherit;
    line-height: normal;
  }

  .reverse {
    animation-direction: reverse;
  }

  @keyframes marquee {
    100% {
      transform: translate(0, 0);
    }
  }
</style>

<div class="marquee-container" bind:offsetWidth={_marqueecontainerWidth}>
  <div
    class="marquee-content"
    style={_style}
    class:reverse
    class:hoverable={hoverable && _contentWidth > _marqueecontainerWidth}
  >
    <span bind:offsetWidth={_contentWidth}>{`${content} `}</span>
    {#if _contentWidth > _marqueecontainerWidth && _arr}
      {#each _arr as item}
        <span>{`${content} `}</span>
      {/each}
    {/if}
  </div>
</div>