// import { error } from '@sveltejs/kit'

import type { TypeCollaboratorSkeleton, TypeFilmSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const [page] = await Promise.all([
    content.getEntries<TypePageSkeleton>({ content_type: "page", include: 2, "fields.identifier": params.id, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
  ])

  return {
    page: page.items[0]
  }
})