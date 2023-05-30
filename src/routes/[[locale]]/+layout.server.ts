import { contentful, type Tag } from '$lib/clients/contentful'

export const load = async ({ locals, params, url }) => {
  const [tags] = await Promise.all([
    contentful.getEntries<Tag>({ content_type: 'tag', select: ['sys.id', 'fields.title', 'fields.identifier', 'fields.isACollaborator'], locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' })
  ])

  return {
    tags: tags.items,
    locale: params.locale || 'fr'
  }
}