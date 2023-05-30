// import { error } from '@sveltejs/kit'

import { contentful, type Page } from '$lib/clients/contentful'

export const load = (async ({ locals, url, params }) => {
  const [page] = await Promise.all([
    contentful.getEntry<Page>('3s6TiulHji6jcQw4SpWG6S', { include: 2, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
  ])

  return {
    page
  }
})