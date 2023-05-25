// import { error } from '@sveltejs/kit'

import { type Article, contentful } from '$lib/clients/contentful'

const limit = 6

export const load = (async ({ locals, url, params }) => {
  const currentPage = url.searchParams.has("p") ? parseInt(url.searchParams.get("p")) : 0
  const currentTag = url.searchParams.get('tag')

  const [articles, tags] = await Promise.all([
    contentful.getEntries<Article>({ content_type: 'article', order: ['-fields.publishedDate', '-sys.createdAt'], limit, skip: currentPage * limit, ...currentTag && {
      'fields.tags': currentTag,
    } }),
    contentful.getEntries<Article>({ content_type: 'article', limit: 200, select: ['fields.tags'] }),
  ])

  return {
    articles,
    currentPage,
    numberOfPages: Math.ceil(articles.total / limit),
    currentTag,
    articleTags: Object.keys(tags.items.reduce((o, tag) => {
      tag.fields.tags.forEach(t => {
        o[t] = true
      })
      return o
    }, {}))
  }
})