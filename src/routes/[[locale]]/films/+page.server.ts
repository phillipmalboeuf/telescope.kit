// import { error } from '@sveltejs/kit'

import { contentful, type Collaborator, type Film, type Page } from '$lib/clients/contentful'

const limit = 6

export const load = (async ({ locals, url, params }) => {
  const currentPage = url.searchParams.has("p") ? parseInt(url.searchParams.get("p")) : 0
  const currentTag = url.searchParams.get('tag')
  const currentDirector = url.searchParams.get('director')

  const [page, films, tags] = await Promise.all([
    contentful.getEntry<Page>('6FmiRHva6nNEgBkXrRNkTY', { include: 2, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
    contentful.getEntries<Film>({ content_type: 'film', order: ['-fields.publishedDate', '-sys.createdAt'], locale: { 'en': 'en-US' }[params.locale] || 'fr-CA', limit, skip: currentPage * limit, ...currentDirector && {
      'fields.director.fields.tagIdentifier': currentDirector,
      'fields.director.sys.contentType.sys.id': 'collaborator'
    }, ...currentTag && {
      'fields.tags': currentTag,
    } }),
    contentful.getEntries<Film>({ content_type: 'film', limit: 200, select: ['fields.tags'], locale: { 'en': 'en-US' }[params.locale] || 'fr-CA', ...currentDirector && {
      'fields.director.fields.tagIdentifier': currentDirector,
      'fields.director.sys.contentType.sys.id': 'collaborator'
    } }),
  ])

  return {
    films,
    page,
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