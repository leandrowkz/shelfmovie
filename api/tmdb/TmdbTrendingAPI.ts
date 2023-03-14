import { Movie } from '../../src/types/Movie'
import { TmdbAPIResponseList } from '../../src/types/TmdbAPIResponseList'
import { TmdbTimeWindow } from '../../src/types/TmdbTimeWindow'
import { TmdbBaseAPI } from './TmdbBaseAPI'

export class TmdbTrendingAPI extends TmdbBaseAPI {
  /**
   * Get the daily or weekly trending movies. The daily trending list tracks
   * items over the period of a day while items have a 24 hour half life.
   * The weekly list tracks items over a 7 day period, with a 7 day half life.
   *
   * @param timeWindow
   * @returns Promise<TmdbAPIResponseList<Movie>>
   * @see https://developers.themoviedb.org/3/trending/get-trending
   */
  public async movies(
    timeWindow: TmdbTimeWindow
  ): Promise<TmdbAPIResponseList<Movie>> {
    const path = this.getPath(`/trending/movie/${timeWindow}`)

    return this.get<TmdbAPIResponseList<Movie>>(path)
  }
}