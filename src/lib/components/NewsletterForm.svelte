<script>
  import { fade, fly } from 'svelte/transition'
	import { onMount } from 'svelte'

  export let id
  let popup = false
  let success = false

	onMount(async () => {
    const sk = await import('@statickit/standalone')
		sk.default('form', `#${id}`, {
			id: 'b98ecb61f446',
      onSuccess: function(config) {
        success = true
        popup = true
      }
		})
	})
</script>

<style>
  label {
    display: block;
    margin-bottom: calc(var(--rythm) / 4);
  }

  input {
    font-size: var(--tiny);
    border-bottom: 1px solid transparent;
  }

  aside {
    position: fixed;
		z-index: 20;
		top: 0;
		right: 0;

    display: flex;
    justify-content: center;
    align-items: center;

		width: 100vw;
		height: 100vh;
  }

    aside button {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: hsla(0, 0%, 0%, 0.666);
      border: none;
    }

    aside div {
      position: relative;
      z-index: 1;
      padding: var(--gutter);

      color: black;
      background: white;
      width: 95%;
      max-width: calc(var(--rythm) * 30);
    }
</style>

{#if success}
<h4>Thank you!</h4>
{:else}
<form {id}>
  <label for="email">Newsletter Subscription</label>
  <input id="email" type="email" name="email" value="" placeholder="Enter your email here" />
  <button type="submit">→</button>
  <div data-sk-error="email"></div>
</form>
{/if}

{#if popup}
<aside transition:fade>
  <button on:click={() => popup = false} />
  <div transition:fly={{ y: 100, opacity: 1 }}>
    <h4>Successfully Submitted.</h4>
    <h4>Thanks for subscribing to our newsletter.</h4>
    <h4>You'll be the first to know about our releases.</h4>
    <h6>Telescope Film Team</h6>
  </div>
</aside>
{/if}
