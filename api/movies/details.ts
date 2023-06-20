import { json, tmdb } from '../api'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) => {
  const { searchParams } = new URL(req.url)
  const id = Number(searchParams.get('movieId'))

  const movie = await tmdb.movies.details(id)

  return json(movie)
}