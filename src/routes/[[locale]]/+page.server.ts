// import { error } from '@sveltejs/kit'

import { contentful, type Collaborator, type Film, type Page } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const [page, films] = await Promise.all([
    contentful.getEntry<Page>('6FmiRHva6nNEgBkXrRNkTY', { include: 2, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
    contentful.getEntry<Page>('1mriyecFg4Yu8vtPwuNnCh', { include: 3, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
    // contentful.getEntries<Film>({ content_type: 'film', 'fields.director[exists]': true, 'fields.tags': 'recent', order: ['-fields.publishedDate'], locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
  ])

  return {
    page,
    films: (films.fields.content as Entry<Film>[]).filter(c => c.sys.contentType.sys.id === 'film' && (c.fields.tags as string[])?.includes('recent'))
  }
})