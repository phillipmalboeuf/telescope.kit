<script lang="ts">
	import { page } from '$app/stores'

	import Tag from './Tag.svelte'
  export let tags: string[]
	export let path: string = undefined

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
{#if tag !== 'recent' && (!contentTags[tag] || !contentTags[tag]?.isACollaborator)}
{#if path}
<a href="{path}?tag={tag}"><Tag id={tag} /></a> 
{:else}
<span><Tag id={tag} /></span>
{/if}
{/if}
{/each}