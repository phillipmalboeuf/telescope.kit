// import { error } from '@sveltejs/kit'

import { contentful } from '$lib/clients/contentful'

export const load = (async ({ locals, url, params }) => {
  const [page] = await Promise.all([
    contentful.getEntry('2l5u7u5276hDH9wNQ8mk9m', { include: 2 }),
  ])

  return {
    page
  }
})