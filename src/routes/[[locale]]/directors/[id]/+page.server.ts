// import { error } from '@sveltejs/kit'

import type { TypeCollaboratorSkeleton, TypeFilmSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const [director, films] = await Promise.all([
    content.getEntries<TypeCollaboratorSkeleton>({ content_type: "collaborator", include: 2, "fields.tagIdentifier": params.id, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
    content.getEntries<TypeFilmSkeleton>({ content_type: "film", include: 1, limit: 6, order: ["-fields.publishedDate"], locale: { 'en': 'en-US' }[params.locale] || 'fr-CA',
      'fields.director.fields.tagIdentifier': params.id,
      'fields.director.sys.contentType.sys.id': 'collaborator'
    })
  ])

  return {
    director: director.items[0],
    portfolio: films.items
  }
})