import { createClient, type Asset, type Entry, type EntryFieldTypes } from 'contentful'
import type { Document } from '@contentful/rich-text-types'

export const contentful = createClient({
  space: '2g43ft9kwm8s',
  accessToken: '7-3Uo3dqE-tm2XJOO3t_JJl9-06ZkJi3vRqqQHGNBeI'
}).withoutUnresolvableLinks

// const select = ['sys.id', 'fields.title', 'fields.identifier', 'fields.tags', 'fields.poster', 'fields.publishedDate']
// const order = ['-fields.publishedDate', '-sys.createdAt']
// export const navigation = locale => Promise.all([
//   client.getEntries({ content_type: 'article', locale, select, order }),
//   client.getEntries({ content_type: 'film', locale, select: select + ',fields.teaser,fields.animationList,fields.ralisateur', order }),
//   // client.getEntries({ content_type: 'product', locale, select, order }),
//   // client.getEntries({ content_type: 'aboutPiece', locale, select: ['sys.id', 'fields.title', 'fields.identifier', 'fields.tags'].join(','), order }),
//   client.getEntries({ content_type: 'contactPoint', locale, select: ['sys.id', 'fields.title', 'fields.link', 'fields.linkLabel'], order }),
//   client.getEntries({ content_type: 'tag', locale, select: ['sys.id', 'fields.title', 'fields.identifier', 'fields.isACollaborator'] }),
//   client.getEntry('7xp3hPYSZZdX48KmN6waSQ', { locale })
// ]).then(async ([articles, films, contact, tags, slider])=> {
//   return {
//     articles: articles.items.map(item => ({ ...item, type: 'article' })),
//     films: films.items.map(item => ({ ...item, type: 'film' })),
//     // products: products.items.map(item => ({ ...item, type: 'product' })),
//     // about: about.items.map(item => ({ ...item, type: 'about' })),
//     contact: contact.items.map(item => ({ ...item, type: 'contact' })),
//     tags: tags.items.map(item => ({ ...item, type: 'tag' })),
//     collaborators: slider.fields.collaborators.map(item => ({ ...item, type: 'collaborator' }))
//   }
// })

export const entry = (id: string, locale: string) => contentful.getEntry(id, { locale, include: 2 })
export const asset = (id: string, locale: string) => contentful.getAsset(id, { locale })



export interface Film {
  contentTypeId: 'film'
  fields: {
    title: EntryFieldTypes.Symbol
    identifier: EntryFieldTypes.Symbol
    publishedDate: EntryFieldTypes.Date
    director: EntryFieldTypes.EntryLink<Collaborator>
    realisateur: EntryFieldTypes.Text
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
    poster: EntryFieldTypes.AssetLink
    teaser: EntryFieldTypes.AssetLink
    animationList: EntryFieldTypes.AssetLink
    video: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
    screenGrabs: Entry<any>[]
    crew: EntryFieldTypes.RichText
    description: EntryFieldTypes.RichText
    creditList: EntryFieldTypes.Text
    relatedContent: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<Article | Film>>
  }
}

export interface Collaborator {
  contentTypeId: 'collaborator'
  fields: {
    name: EntryFieldTypes.Symbol
    tagIdentifier: EntryFieldTypes.Symbol
    isADirector: EntryFieldTypes.Boolean
    photo: EntryFieldTypes.AssetLink
    profession: EntryFieldTypes.Text
    linkLabel: EntryFieldTypes.Text
    link: EntryFieldTypes.Text
  }
}

export interface Article {
  contentTypeId: 'article'
  fields: {
    title: EntryFieldTypes.Symbol
    identifier: EntryFieldTypes.Symbol
    publishedDate: EntryFieldTypes.Date
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>
    poster: EntryFieldTypes.AssetLink
    photos: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>
    body: EntryFieldTypes.RichText
    creditList: EntryFieldTypes.Text
    relatedContent: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<Article | Film>>
  }
}

export interface Tag {
  contentTypeId: 'tag'
  fields: {
    title: EntryFieldTypes.Symbol
    identifier: EntryFieldTypes.Symbol
    isACollaborator: EntryFieldTypes.Boolean
  }
}