// import { error } from '@sveltejs/kit'

import { contentful, type Collaborator, type Film, type Page } from '$lib/clients/contentful'

export const load = (async ({ locals, url, params }) => {
  const [page, films] = await Promise.all([
    contentful.getEntry<Page>('6FmiRHva6nNEgBkXrRNkTY', { include: 2 }),
    contentful.getEntries<Film>({ content_type: 'film', 'fields.director[exists]': true, order: ['-fields.publishedDate'] }),
  ])

  return {
    page,
    films
  }
})