// import { error } from '@sveltejs/kit'

import { contentful, type Collaborator, type Film, type Page } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

const limit = 6

export const load = (async ({ locals, url, params }) => {
  const currentPage = url.searchParams.has("p") ? parseInt(url.searchParams.get("p")) : 0
  const currentTag = url.searchParams.get('tag')
  const currentDirector = url.searchParams.get('director')

  const [page, projects] = await Promise.all([
    contentful.getEntry<Page>('6FmiRHva6nNEgBkXrRNkTY', { include: 2, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
    contentful.getEntry<Page>('1mriyecFg4Yu8vtPwuNnCh', { include: 1, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
  ])

  const ids = (projects.fields.content as Entry<Film>[]).filter(c => c.sys.contentType.sys.id === 'film').map(project => project.fields.identifier)

  const [films, tags] = await Promise.all([
    contentful.getEntries<Film>({ content_type: 'film', 'fields.identifier[in]': ids, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA', limit, skip: currentPage * limit, ...currentDirector && {
      'fields.director.fields.tagIdentifier': currentDirector,
      'fields.director.sys.contentType.sys.id': 'collaborator'
    }, ...currentTag && {
      'fields.tags': currentTag,
    } }),
    contentful.getEntries<Film>({ content_type: 'film', 'fields.identifier[in]': ids, limit: 200, select: ['fields.tags'], locale: { 'en': 'en-US' }[params.locale] || 'fr-CA', ...currentDirector && {
      'fields.director.fields.tagIdentifier': currentDirector,
      'fields.director.sys.contentType.sys.id': 'collaborator'
    } }),
  ])

  return {
    films: ids.map(id => films.items.find(film => film.fields.identifier === id)).filter(film => film),
    page,
    projects,
    currentPage,
    numberOfPages: Math.ceil(films.total / limit),
    currentTag,
		currentDirector,
    filmTags: Object.keys(tags.items.filter((tag) => tag).reduce((o, tag) => {
      tag.fields?.tags.forEach(t => {
        o[t] = true
      })
      return o
    }, {}))
  }
})