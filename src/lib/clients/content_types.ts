import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeAboutPieceFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    publishedDate?: EntryFieldTypes.Date;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    body: EntryFieldTypes.RichText;
}

export type TypeAboutPieceSkeleton = EntrySkeletonType<TypeAboutPieceFields, "aboutPiece">;
export type TypeAboutPiece<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeAboutPieceSkeleton, Modifiers, Locales>;

export function isTypeAboutPiece<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeAboutPiece<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'aboutPiece'
}

export interface TypeArticleFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    publishedDate?: EntryFieldTypes.Date;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    poster: EntryFieldTypes.AssetLink;
    photos: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    body: EntryFieldTypes.RichText;
    creditList?: EntryFieldTypes.Text;
    relatedContent?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeFilmSkeleton | TypeProductSkeleton>>;
}

export type TypeArticleSkeleton = EntrySkeletonType<TypeArticleFields, "article">;
export type TypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeArticleSkeleton, Modifiers, Locales>;

export function isTypeArticle<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeArticle<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'article'
}

export interface TypeCollaboratorFields {
    name: EntryFieldTypes.Symbol;
    tagIdentifier?: EntryFieldTypes.Symbol;
    isADirector?: EntryFieldTypes.Boolean;
    biographie?: EntryFieldTypes.Text;
    photo?: EntryFieldTypes.AssetLink;
    featuredFilm?: EntryFieldTypes.EntryLink<EntrySkeletonType>;
    featuredFilms?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeFilmSkeleton>>;
    profession?: EntryFieldTypes.Symbol;
    linkLabel?: EntryFieldTypes.Symbol;
    link?: EntryFieldTypes.Symbol;
}

export type TypeCollaboratorSkeleton = EntrySkeletonType<TypeCollaboratorFields, "collaborator">;
export type TypeCollaborator<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCollaboratorSkeleton, Modifiers, Locales>;

export function isTypeCollaborator<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCollaborator<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'collaborator'
}

export interface TypeCollaboratorSliderFields {
    collaborators?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCollaboratorSkeleton>>;
}

export type TypeCollaboratorSliderSkeleton = EntrySkeletonType<TypeCollaboratorSliderFields, "collaboratorSlider">;
export type TypeCollaboratorSlider<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeCollaboratorSliderSkeleton, Modifiers, Locales>;

export function isTypeCollaboratorSlider<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeCollaboratorSlider<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'collaboratorSlider'
}

export interface TypeContactPersonFields {
    name: EntryFieldTypes.Symbol;
    position?: EntryFieldTypes.Symbol;
    phone?: EntryFieldTypes.Symbol;
    email?: EntryFieldTypes.Symbol;
    category?: EntryFieldTypes.Symbol;
}

export type TypeContactPersonSkeleton = EntrySkeletonType<TypeContactPersonFields, "contactPerson">;
export type TypeContactPerson<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeContactPersonSkeleton, Modifiers, Locales>;

export function isTypeContactPerson<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeContactPerson<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'contactPerson'
}

export interface TypeContactPointFields {
    title: EntryFieldTypes.Symbol;
    linkLabel: EntryFieldTypes.Symbol;
    link: EntryFieldTypes.Symbol;
    publishedDate?: EntryFieldTypes.Date;
    contacts?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeContactPersonSkeleton>>;
}

export type TypeContactPointSkeleton = EntrySkeletonType<TypeContactPointFields, "contactPoint">;
export type TypeContactPoint<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeContactPointSkeleton, Modifiers, Locales>;

export function isTypeContactPoint<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeContactPoint<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'contactPoint'
}

export interface TypeFilmFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    publishedDate?: EntryFieldTypes.Date;
    status?: EntryFieldTypes.Symbol<"Distribution" | "Production">;
    director?: EntryFieldTypes.EntryLink<TypeCollaboratorSkeleton>;
    ralisateur?: EntryFieldTypes.Symbol;
    client?: EntryFieldTypes.Symbol;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    poster?: EntryFieldTypes.AssetLink;
    full?: EntryFieldTypes.Boolean;
    teaser?: EntryFieldTypes.AssetLink;
    animationList?: EntryFieldTypes.AssetLink;
    video: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    screenGrabs?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeScreenGrabSkeleton>>;
    crew?: EntryFieldTypes.RichText;
    description?: EntryFieldTypes.RichText;
    distribution?: EntryFieldTypes.RichText;
    synopsis?: EntryFieldTypes.RichText;
    prix?: EntryFieldTypes.RichText;
    creditList?: EntryFieldTypes.Text;
    popup?: EntryFieldTypes.EntryLink<TypePopupSkeleton>;
    relatedContent?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeFilmSkeleton | TypeProductSkeleton>>;
}

export type TypeFilmSkeleton = EntrySkeletonType<TypeFilmFields, "film">;
export type TypeFilm<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeFilmSkeleton, Modifiers, Locales>;

export function isTypeFilm<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeFilm<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'film'
}

export interface TypeLooseTextFields {
    title?: EntryFieldTypes.Symbol;
    body: EntryFieldTypes.RichText;
}

export type TypeLooseTextSkeleton = EntrySkeletonType<TypeLooseTextFields, "looseText">;
export type TypeLooseText<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeLooseTextSkeleton, Modifiers, Locales>;

export function isTypeLooseText<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeLooseText<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'looseText'
}

export interface TypeNavigationFields {
    identifier: EntryFieldTypes.Symbol;
    links?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavigationLinkSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;

export function isTypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigation<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigation'
}

export interface TypeNavigationLinkFields {
    label?: EntryFieldTypes.Symbol;
    link?: EntryFieldTypes.Symbol;
    external?: EntryFieldTypes.Boolean;
    subLinks?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavigationLinkSkeleton>>;
}

export type TypeNavigationLinkSkeleton = EntrySkeletonType<TypeNavigationLinkFields, "navigationLink">;
export type TypeNavigationLink<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeNavigationLinkSkeleton, Modifiers, Locales>;

export function isTypeNavigationLink<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeNavigationLink<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'navigationLink'
}

export interface TypePageFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.Text;
    content?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeAboutPieceSkeleton | TypeArticleSkeleton | TypeCollaboratorSkeleton | TypeCollaboratorSliderSkeleton | TypeContactPersonSkeleton | TypeContactPointSkeleton | TypeFilmSkeleton | TypeLooseTextSkeleton>>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePageSkeleton, Modifiers, Locales>;

export function isTypePage<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePage<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'page'
}

export interface TypePopupFields {
    title?: EntryFieldTypes.Symbol;
    body?: EntryFieldTypes.RichText;
    linkLabel?: EntryFieldTypes.Symbol;
    link?: EntryFieldTypes.Symbol;
    poster?: EntryFieldTypes.AssetLink;
}

export type TypePopupSkeleton = EntrySkeletonType<TypePopupFields, "popup">;
export type TypePopup<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypePopupSkeleton, Modifiers, Locales>;

export function isTypePopup<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypePopup<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'popup'
}

export interface TypeProductFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    publishedDate?: EntryFieldTypes.Date;
    tags: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    sizes?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    colors?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    price: EntryFieldTypes.Number;
    soldOut?: EntryFieldTypes.Boolean;
    description: EntryFieldTypes.RichText;
    poster: EntryFieldTypes.AssetLink;
    photos: EntryFieldTypes.Array<EntryFieldTypes.AssetLink>;
    relatedContent?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeArticleSkeleton | TypeFilmSkeleton | TypeProductSkeleton>>;
}

export type TypeProductSkeleton = EntrySkeletonType<TypeProductFields, "product">;
export type TypeProduct<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeProductSkeleton, Modifiers, Locales>;

export function isTypeProduct<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeProduct<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'product'
}

export interface TypeScreenGrabFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    time: EntryFieldTypes.Number;
    thumbnail: EntryFieldTypes.AssetLink;
}

export type TypeScreenGrabSkeleton = EntrySkeletonType<TypeScreenGrabFields, "screenGrab">;
export type TypeScreenGrab<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeScreenGrabSkeleton, Modifiers, Locales>;

export function isTypeScreenGrab<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeScreenGrab<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'screenGrab'
}

export interface TypeTagFields {
    title: EntryFieldTypes.Symbol;
    identifier: EntryFieldTypes.Symbol;
    isACollaborator?: EntryFieldTypes.Boolean;
}

export type TypeTagSkeleton = EntrySkeletonType<TypeTagFields, "tag">;
export type TypeTag<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<TypeTagSkeleton, Modifiers, Locales>;

export function isTypeTag<Modifiers extends ChainModifiers, Locales extends LocaleCode>(entry: Entry<EntrySkeletonType, Modifiers, Locales>): entry is TypeTag<Modifiers, Locales> {
    return entry.sys.contentType.sys.id === 'tag'
}
