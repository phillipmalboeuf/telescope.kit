// import { error } from '@sveltejs/kit'

import { contentful, type Collaborator, type Film } from '$lib/clients/contentful'

export const load = (async ({ locals, url, params }) => {
  const [directors, films] = await Promise.all([
    contentful.getEntries<Collaborator>({ content_type: 'collaborator', 'fields.isADirector': true }),
    contentful.getEntries<Film>({ content_type: 'film', 'fields.director[exists]': true, order: ['-fields.publishedDate'] }),
  ])

  return {
    directors,
    films
  }
})