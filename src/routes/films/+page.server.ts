// import { error } from '@sveltejs/kit'

import { contentful, type Collaborator, type Film } from '$lib/clients/contentful'

const limit = 6

export const load = (async ({ locals, url, params }) => {
  const currentPage = url.searchParams.has("p") ? parseInt(url.searchParams.get("p")) : 0
  const currentTag = url.searchParams.get('tag')
  const currentDirector = url.searchParams.get('director')

  const [films, directors, tags] = await Promise.all([
    contentful.getEntries<Film>({ content_type: 'film', order: ['-fields.publishedDate', '-sys.createdAt'], limit, skip: currentPage * limit, ...currentDirector && {
      'fields.director.fields.tagIdentifier': currentDirector,
      'fields.director.sys.contentType.sys.id': 'collaborator'
    }, ...currentTag && {
      'fields.tags': currentTag,
    } }),
    contentful.getEntries<Collaborator>({ content_type: 'collaborator', 'fields.isADirector': true }),
    contentful.getEntries<Film>({ content_type: 'film', limit: 200, select: ['fields.tags'], ...currentDirector && {
      'fields.director.fields.tagIdentifier': currentDirector,
      'fields.director.sys.contentType.sys.id': 'collaborator'
    } }),
  ])

  return {
    films,
    directors,
    currentPage,
    numberOfPages: Math.ceil(films.total / limit),
    currentTag,
		currentDirector,
    filmTags: Object.keys(tags.items.reduce((o, tag) => {
      tag.fields.tags.forEach(t => {
        o[t] = true
      })
      return o
    }, {}))
  }
})