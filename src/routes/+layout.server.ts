import { contentful } from '$lib/clients/contentful'

export const load = async ({ locals, url }) => {
  const [tags] = await Promise.all([
    contentful.getEntries({ content_type: 'tag', select: ['sys.id', 'fields.title', 'fields.identifier', 'fields.isACollaborator'] })
  ])

  return {
    tags: tags.items,
    locale: 'fr-CA'
  }
}