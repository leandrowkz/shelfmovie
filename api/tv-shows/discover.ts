import type { DiscoverTVShowFilters } from '@leandrowkz/tmdb'
import { tmdb } from '../api'
import { transformListResponse } from '../helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)

  const filters = Object.fromEntries(
    searchParams.entries()
  ) as DiscoverTVShowFilters

  const response = await tmdb.discover.tv(filters)

  return transformListResponse(response, 'tv')
}
