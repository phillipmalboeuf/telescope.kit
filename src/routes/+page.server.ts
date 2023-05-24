// import { error } from '@sveltejs/kit'

import { contentful } from '$lib/clients/contentful'

export const load = (async ({ locals, url, params }) => {
  // const [articles, films] = await Promise.all([
  //   contentful.getEntries({ content_type: 'article' }),
  //   contentful.getEntries({ content_type: 'film' }),
  // ])

  return {
    // articles,
    // films
  }
})