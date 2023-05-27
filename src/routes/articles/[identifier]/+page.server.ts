// import { error } from '@sveltejs/kit'

import { type Article, contentful } from '$lib/clients/contentful'

export const load = (async ({ locals, url, params }) => {
  const [articles] = await Promise.all([
    contentful.getEntries<Article>({ content_type: 'article', 'fields.identifier': params.identifier, limit: 1 }),
  ])

  return {
    article: articles.items[0]
  }
})