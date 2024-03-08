<script lang="ts">
  import { onMount } from 'svelte'

  // import Gallery from './Gallery.svelte'

  import { page } from '$app/stores'

  // export let poster
  export let srcs
  export let grabs = undefined

  let time = 0
	let duration: number
  let buffered
	let paused: boolean = true
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
    localStorage.setItem("volume", volume ? "on" : "muted")
  }

  function selectResolution(index) {
    resolution = index
  }

  function requestToggleFullscreen() {
    if (!fullscreen) {
      element.webkitRequestFullscreen()
    } else {
      element.webkitCancelFullScreen()
    }
  }

  function toggleFullscreen() {
    fullscreen = !fullscreen
  }

  function scrollPastVideo() {
		window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
	}

  function keydown(e) {
    if (e.key === ' ') {
      e.preventDefault()
      togglePaused()
    }
  }

  function activate() {
    clearTimeout(inactiveTimeout)
    inactiveTimeout = setTimeout(() => inactive = true, 1666)
    inactive = false
  }

  // function grab(index) {
  //   seek(grabs[index].fields.time)
  // }

  onMount(() => {
    document.addEventListener('webkitfullscreenchange', toggleFullscreen, false)

    volume = localStorage.getItem("volume") === "muted" ? 0 : 1

    return () => document.removeEventListener('webkitfullscreenchange', toggleFullscreen)
  })
</script>

<svelte:window on:keydown={keydown} />

<figure class:inactive class:fullscreen on:mousemove={activate} bind:this={element}>
  <!-- <figcaption class="breadcrumbs">
    <h6><a href="{$page.data.locale === 'fr' ? '' : `/${$page.data.locale}`}/projets{$page.url.searchParams.has("director") ? `?director=${$page.url.searchParams.get("director")}` : ''}" rel=prefetch>{$page.data.locale === 'fr' ? 'Retour aux projets' : 'Back to Projects'}</a></h6>
  </figcaption> -->
  <figcaption class="title"><slot name="title" /></figcaption>

  <video autoplay={$page.data.device === 'desktop'} disableRemotePlayback
    src={srcs ? srcs[resolution].fields?.file?.url?.replace('//videos.ctfassets.net', '//telescopefilms.b-cdn.net') : undefined}
    bind:currentTime={time}
    bind:duration
    bind:buffered
    bind:paused
    bind:volume
    on:play={activate}
    on:click={togglePaused} />
  
  <figcaption class="controls">
    <button class="button--blur button--blur--dark" on:click={togglePaused}>{#if paused}Play{:else}Pause{/if}</button>
    <button on:click={toggleVolume}>{#if volume}Sound Off{:else}Sound On{/if}</button>

    <div>
      {#if duration}
      <label for="time" style="left: {time / duration * 100}%">{format(time)} / {format(duration)}</label>
      <input id="time" name="time" type="range" value={time} min={0} step={0.01} max={duration}
        on:input={e => seek(e.currentTarget.value)} />
      {/if}
    </div>
    
    <!-- <span>
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
      
      <button on:click={scrollPastVideo} style="transform: rotate(90deg)">→</button>
    </span> -->
  </figcaption>

  <!-- <figcaption class="seeker">
    {#if buffered}
    {#each buffered as { start, end }}
    <div class="buffer" style="left: {start / duration * 100}%; width: {(end - start) / duration * 100}%;" />
    {/each}
    {/if}
  </figcaption> -->
</figure>

<!-- {#if grabs}
  <Gallery images={grabs.map(grab => ({ thumbnail: grab.fields.thumbnail }))} on:pick={event => grab(event.detail)} />
{/if} -->



<style lang="scss">
  video {
    width: 100vw;
    height: 100vh;
    background: $black;
    // object-fit: cover;

    @media (max-width: $mobile) {
      height: 50vh;
      object-fit: cover;
    }
  }

  figure {
    position: relative;
    z-index: 2000;

    color: white;
    // cursor: default;
  }

  figure.inactive {
    // cursor: none;
  }

  figure.fullscreen video {
    height: var(--height);
  }

  figcaption {
    transition: opacity 666ms;
    opacity: 1;
  }

  figure.inactive figcaption {
    @media (min-width: $mobile) {
      opacity: 0;
    }
  }

  figcaption.title {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    // padding: $base;
    // text-align: center;
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
    left: $base;
    bottom: 0;
    // padding: 0 $base;
    width: calc(100% - ($base * 2));
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    @media (max-width: $mobile) {
      left: 0;
      bottom: $mobile_base;
      width: 100%;
    }
  }

    button,
    div {
      flex: 1;
      text-align: left;
      color: $white;

      @media (min-width: $mobile) {
        background-color: transparent;
        -webkit-backdrop-filter: none;
        backdrop-filter: none;
        padding: $base 0;
      }

      @media (max-width: $mobile) {
        &:not(:first-child) { display: none; }
        
        flex: none;
        margin-left: auto;
        margin-right: $mobile_base;;
        padding: ($base * 0.33) ($base * $scale);
      }
    }

    div {
      flex: 2;
      text-align: right;
    }

    button.faded {
      opacity: 0.666;
    }

    label[for="time"] {
      // position: absolute;
      // bottom: $gap * 3;
      // font-size: var(--tiny);
      // transform: translateX(-50%);
    }

    figure.fullscreen input[type="range"] {
      // bottom: 30px;
    }

    input[type="range"] {
      position: absolute;
      bottom: $gap * 2.5;
      left: 0;
      width: 100%;
      margin: 0;

      // cursor: col-resize;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      height: 2px;
      background-color: $white;

      @media (max-width: $mobile) {
        display: none;
      }
    }

    // figure.fullscreen input[type="range"] {
    //   bottom: 6px;
    // }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;

      width: $base * 0.5;
      height: $base * 0.5;
      background: $white;
      border-radius: 50%;
    }

    input[type="range"]::-moz-range-thumb {
      -moz-appearance: none;

      width: $base * 0.5;
      height: $base * 0.5;
      background: $white;
      border-radius: 50%; 
    }

    // .buffer {
    //   position: absolute;
    //   bottom: 0;

    //   display: block;
    //   height: 12px;
    //   background: white;
    // }

    // figure.fullscreen .buffer {
    //   bottom: -6px;
    // }
</style>