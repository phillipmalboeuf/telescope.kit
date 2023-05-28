<script>
  import { onMount } from 'svelte'

  import Gallery from './Gallery.svelte'

  import { page } from '$app/stores'

  // export let poster
  export let srcs
  export let grabs = undefined

  let time = 0
	let duration
  let buffered
	let paused
  let resolution = 0
  let showResolutions = false
  let volume = 1
  let fullscreen = false
  let inactive = false

  let element
  let inactiveTimeout

  function format(t) {
    return Math.floor(t / 60) + ":" + ("0" + (t % 60).toFixed()).slice(-2)
  }

  function seek(t) {
    time = t
  }

  function togglePaused() {
    paused = !paused
    if (paused) {
      clearTimeout(inactiveTimeout)
      inactive = false
    }
  }

  function toggleVolume() {
    volume = volume ? 0 : 1
  }

  function selectResolution(index) {
    resolution = index
  }

  function requestToggleFullscreen() {
    if (!fullscreen) {
      element.webkitRequestFullscreen()
    } else {
      document.webkitCancelFullScreen()
    }
  }

  function toggleFullscreen() {
    fullscreen = !fullscreen
  }

  function scrollPastVideo() {
		window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
	}

  function keydown(e) {
    if (controls && e.key === ' ') {
      e.preventDefault()
      togglePaused()
    }
  }

  function activate() {
    clearTimeout(inactiveTimeout)
    inactiveTimeout = setTimeout(() => inactive = true, 1666)
    inactive = false
  }

  function grab(index) {
    seek(grabs[index].fields.time)
  }

  onMount(() => {
    document.addEventListener('webkitfullscreenchange', toggleFullscreen, false)

    return () => document.removeEventListener('webkitfullscreenchange', toggleFullscreen)
  })
</script>

<style>
  video {
    width: 100%;
    background: black;
  }

  video {
    width: 100vw;
    height: var(--height);
    margin: calc(var(--gutter) * -1) 0 0 calc(var(--gutter) * -1);
  }

  @media (max-width: 900px) {
    video {
      height: 42vh;
    }
  }

  figure {
    position: relative;
    margin: 0;

    color: white;
    cursor: default;
  }

  figure.inactive {
    cursor: none;
  }

  figure.fullscreen video {
    height: var(--height);
    margin: 0;
  }

  figcaption {
    transition: opacity 666ms;
    opacity: 1;
  }

  figure.inactive figcaption {
    opacity: 0;
  }

  figcaption.breadcrumbs {
    position: absolute;
    top: calc(var(--gutter) * -0.5);
    left: calc(var(--gutter) * -0.5);
    z-index: 2;
  }

    figcaption.breadcrumbs a {
      opacity: 0.5;
      padding: calc(var(--gutter) / 4);
    }

      figcaption.breadcrumbs a:hover {
        opacity: 1;
      }

  figcaption.title {
    position: absolute;
    bottom: calc(var(--rythm) * 4);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    text-align: center;
  }

  /* figure.fullscreen figcaption.title {
    top: calc(var(--gutter));
    left: calc(var(--gutter));
  }

  @media (max-width: 900px) {
    figure.fullscreen figcaption.title {
      left: calc(var(--gutter) / 2);
    }
  } */

  figcaption.controls {
    position: absolute;
    left: calc(var(--rythm) / -2);
    bottom: calc(var(--rythm) * 4);
    width: calc(100% + (var(--rythm) / 2));
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  @media (max-width: 900px) {
    figcaption.controls {
      bottom: calc(var(--rythm) * 1.5);
    }
  }

  figcaption.controls > span > span {
    display: inline-block;
    max-width: 58pt;
    text-align: right;
  }

  figure.fullscreen figcaption.controls {
    left: 0;
    padding: 0 var(--gutter);
  }

  figure.fullscreen figcaption.seeker {
    padding: 0 var(--gutter);
  }

    button {
      padding: calc(var(--rythm) / 2);
      font-size: var(--tiny);
    }

    button.faded {
      opacity: 0.666;
    }

    label[for="time"] {
      position: absolute;
      bottom: 36px;
      font-size: var(--tiny);
      transform: translateX(-50%);
    }

    figure.fullscreen input[type="range"] {
      bottom: 30px;
    }

    input[type="range"] {
      position: absolute;
      bottom: 12px;
      left: 0;
      width: 100%;
      margin: 0;

      cursor: col-resize;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
    }

    figure.fullscreen input[type="range"] {
      bottom: 6px;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;

      width: 3px;
      height: 16px;
      background: white;      
    }

    input[type="range"]::-moz-range-thumb {
      -moz-appearance: none;

      width: 3px;
      height: 16px;
      background: white;      
    }

    .buffer {
      position: absolute;
      bottom: 0;

      display: block;
      height: 12px;
      background: white;
    }

    figure.fullscreen .buffer {
      bottom: -6px;
    }

    @media (max-width: 900px) {
      label[for="time"] {
        bottom: 20px;
      }

      figure.fullscreen input[type="range"] {
        bottom: 15px;
      }

      input[type="range"] {
        bottom: 9px;
      }

      figure.fullscreen input[type="range"] {
        bottom: 3px;
      }

      input[type="range"]::-webkit-slider-thumb {
        width: 2px;
        height: 7px;  
      }

      input[type="range"]::-moz-range-thumb {
        width: 2px;
        height: 7px;  
      }

      .buffer {
        height: 9px;
      }

      figure.fullscreen .buffer {
        bottom: -3px;
      }
    }
</style>

<svelte:window on:keydown={keydown} />

<figure class:inactive class:fullscreen on:mousemove={activate} bind:this={element}>
  <figcaption class="breadcrumbs">
    <h6><a href="" rel=prefetch>Telescope</a> <a href="/films" rel=prefetch>{$page.data.locale === 'fr-CA' ? 'Retour aux films' : 'Back to Films'}</a></h6>
  </figcaption>
  <figcaption class="title"><slot name="title" /></figcaption>

  <!-- <video src={srcs ? srcs[resolution].fields.file.url.replace('//videos.ctfassets.net', '//telescopefilms.b-cdn.net') : undefined} autoplay disableRemotePlayback
    bind:currentTime={time}
    bind:duration
    bind:buffered
    bind:paused
    bind:volume
    on:play={activate}
    on:click={togglePaused} /> -->
  
  <figcaption class="controls">
    <button on:click={togglePaused}>{#if paused}➞{:else}❚{/if}</button>
    <span>
      <span on:mouseenter={() => showResolutions = true} on:mouseleave={() => showResolutions = false}>
        {#if showResolutions}
        {#each srcs as src, index}
        <button class:faded={resolution !== index} on:click={() => selectResolution(index)}>{src.fields.description}</button>   
        {/each}
        {:else}
        <button>{srcs[resolution].fields.description}</button>  
        {/if}
      </span>
      <button on:click={requestToggleFullscreen}>{#if fullscreen}╻{:else}╹{/if}</button>
      <button on:click={toggleVolume}>{#if volume}⌑{:else}⊠{/if}</button>
      <button on:click={scrollPastVideo} style="transform: rotate(90deg)">→</button>
    </span>
  </figcaption>

  <figcaption class="seeker">
    {#if duration}
    <label for="time" style="left: {time / duration * 100}%">{format(time)} / {format(duration)}</label>
    <input id="time" name="time" type="range" value={time} min={0} step={0.01} max={duration}
      on:input={e => seek(e.currentTarget.value)} />
    {/if}

    {#if buffered}
    {#each buffered as { start, end }}
    <div class="buffer" style="left: {start / duration * 100}%; width: {(end - start) / duration * 100}%;" />
    {/each}
    {/if}
  </figcaption>
</figure>

{#if grabs}
  <Gallery images={grabs.map(grab => ({ thumbnail: grab.fields.thumbnail }))} on:pick={event => grab(event.detail)} />
{/if}