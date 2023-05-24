<script>
	import { page } from '$app/stores'

  export let id
</script>

{$page.data.tags?.find(t => t.fields.identifier === id)
  ? $page.data.tags.find(t => t.fields.identifier === id).fields.title
  : id}


