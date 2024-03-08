// import { error } from '@sveltejs/kit'

import type { TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const [page] = await Promise.all([
    content.getEntry<TypePageSkeleton>('486FaWzKAiwD9qe2cF0cVs', { include: 1, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
    // contentful.getEntry<Page>('1mriyecFg4Yu8vtPwuNnCh', { include: 3, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
    // contentful.getEntries<Film>({ content_type: 'film', 'fields.director[exists]': true, 'fields.tags': 'recent', order: ['-fields.publishedDate'], locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
  ])

  return {
    page,
  }
})