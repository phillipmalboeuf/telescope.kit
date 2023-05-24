<script>
  import { onMount, tick } from 'svelte'

  export let src
  export let scrollY
  export let windowHeight
  export let poster

  function onScroll(node, [y, height]) {

    return {
      update([y, height]) {
        // if (y + height > node.offsetParent.offsetParent.offsetTop && y < node.offsetParent.offsetParent.offsetTop + node.offsetParent.offsetParent.offsetHeight) {
        //   node.play()
        // } else {
        //   node.pause()
        // }
      }
    }
  }
</script>

<style>
  video {
    width: 100%;
    background: black;
  }
</style>

<video src={src.fields.file.url.replace('//videos.ctfassets.net', '//telescopefilms.b-cdn.net')} loop muted autoplay preload="none" disableRemotePlayback poster={poster} />