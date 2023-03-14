import { json } from './jsonResponse'
import { api } from './tmdb/TmdbAPI'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('id'))

  const movie = await api.movies.details(id, {
    append_to_response: 'videos,casts',
  })

  return json(movie)
}