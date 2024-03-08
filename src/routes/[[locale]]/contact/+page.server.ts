// import { error } from '@sveltejs/kit'

import type { TypeContactPointSkeleton, TypePageSkeleton } from '$lib/clients/content_types'
import { content } from '$lib/clients/contentful'
import type { Entry } from 'contentful'

export const load = (async ({ locals, url, params }) => {
  const [page] = await Promise.all([
    content.getEntry<TypePageSkeleton>('1pkNyppeX05xCy1vKEE5xo', { include: 2, locale: { 'en': 'en-US' }[params.locale] || 'fr-CA' }),
  ])

  return {
    page: {
      ...page,
      fields: {
        ...page.fields,
        content: page.fields.content.filter(item => item.sys.contentType.sys.id === 'contactPoint') as Entry<TypeContactPointSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]
      }
    },
  }
})