// import { error } from '@sveltejs/kit'

import { contentful } from '$lib/clients/contentful'

const limit = 6

export const load = (async ({ locals, url, params }) => {
  const currentPage = url.searchParams.has("p") ? parseInt(url.searchParams.get("p")) : 0

  const [articles] = await Promise.all([
    contentful.getEntries({ content_type: 'article', order: ['-fields.publishedDate', '-sys.createdAt'], limit, skip: currentPage * limit }),
  ])

  return {
    articles,
    currentPage,
    numberOfPages: Math.ceil(articles.total / limit) + 1,
    currentTag: url.searchParams.get('tag'),
		currentCollaborator: url.searchParams.get('director'),
  }
})