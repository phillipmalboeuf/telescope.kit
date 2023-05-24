// import { error } from '@sveltejs/kit'

import { contentful } from '$lib/clients/contentful'

const limit = 6

export const load = (async ({ locals, url, params }) => {
  const currentPage = url.searchParams.has("p") ? parseInt(url.searchParams.get("p")) : 0

  const [films] = await Promise.all([
    contentful.getEntries({ content_type: 'film', order: ['-fields.publishedDate', '-sys.createdAt'], limit, skip: currentPage * limit }),
  ])

  return {
    films,
    currentPage,
    numberOfPages: Math.ceil(films.total / limit) + 1,
    currentTag: url.searchParams.get('tag'),
		currentCollaborator: url.searchParams.get('director'),
  }
})