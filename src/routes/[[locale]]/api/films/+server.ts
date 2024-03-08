import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { content } from '$lib/clients/contentful';
import type { TypeFilmSkeleton } from '$lib/clients/content_types';

export const GET: RequestHandler = async ({ url }) => {

  const director = url.searchParams.get('director')
  const tag = url.searchParams.get('tag')

  const films = await content.getEntries<TypeFilmSkeleton>({
    content_type: 'film',
    include: 1,
    limit: 400,
    "fields.title[exists]": true,
    order: ["-fields.publishedDate"],
    ...tag ? {
      "fields.tags[in]": [tag.split(',')]
    } : {},
    ...director ? {
      'fields.director.fields.tagIdentifier': director,
      'fields.director.sys.contentType.sys.id': 'collaborator'
    } : {}
  })

	return json({
    ...films,
    items: films.items.map(film => {
      delete film.fields.relatedContent
      
      if (film.fields.director) {
        delete film.fields.director.fields.featuredFilm
        delete film.fields.director.fields.featuredFilms
      }
      return film
    })
  });
};