// import { error } from '@sveltejs/kit'

import { contentful } from '$lib/clients/contentful'

export const load = (async ({ locals, url, params }) => {
  const [films] = await Promise.all([
    contentful.getEntries({ content_type: 'film', 'fields.identifier': params.identifier, limit: 1 }),
  ])

  return {
    film: films.items[0]
  }
})