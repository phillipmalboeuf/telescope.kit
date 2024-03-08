import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { content } from '$lib/clients/contentful';
import type { TypeFilmSkeleton, TypeLooseTextSkeleton } from '$lib/clients/content_types';

export const GET: RequestHandler = async ({ url }) => {

  const text = await content.getEntry<TypeLooseTextSkeleton>("5jWkSh1O06fP1EUUAf0QHd")

	return json(text);
};