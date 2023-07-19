import { tmdb, dispatch } from '../api'
import { transformListResponse } from '../helpers'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page') || 1)

    const response = await tmdb.tvShows.airingToday({ page })

    return transformListResponse(response, 'tv')
  })
