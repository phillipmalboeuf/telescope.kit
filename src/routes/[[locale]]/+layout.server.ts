import { contentful, type Popup, type Tag } from '$lib/clients/contentful'

export const load = async ({ locals, params, url }) => {
  const [tags, popups] = await Promise.all([
    contentful.getEntries<Tag>({ content_type: 'tag', select: ['sys.id', 'fields.title', 'fields.identifier', 'fields.isACollaborator'], locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
    contentful.getEntries<Popup>({ content_type: 'popup', select: ['sys.id', 'fields.title', 'fields.body', 'fields.link', 'fields.poster', 'fields.linkLabel'], locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' })
  ])

  return {
    tags: tags.items,
    popups: popups.items,
    locale: params.locale || 'fr'
  }
}