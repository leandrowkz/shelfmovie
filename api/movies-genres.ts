import { json } from './jsonResponse'
import { api } from './tmdb/TmdbAPI'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)

  const filters = Object.fromEntries(searchParams.entries())

  const { results } = await api.discover.movies(filters)

  return json(results)
}
