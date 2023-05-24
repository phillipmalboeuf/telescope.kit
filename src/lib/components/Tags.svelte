<script>
	import { page } from '$app/stores'

	import Tag from './Tag.svelte'
  export let tags
	export let path

	let contentTags
	$: {
		contentTags = $page.data.tags.reduce((contentTags, tag) => {
			return { ...contentTags, [tag.fields.identifier]: tag.fields }
		}, {})
	}
</script>

<style>
</style>


{#each tags as tag, index (tag)}
{#if tag !== 'recent' && (!contentTags[tag] || !contentTags[tag].isACollaborator)}
{#if index}&nbsp;• {/if}<a href="{path}?tag={tag}"><Tag id={tag} /></a> 
{/if}
{/each}