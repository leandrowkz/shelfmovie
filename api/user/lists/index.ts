import type { MovieItem, TVShowItem } from '@leandrowkz/tmdb'
import { tmdb, authorize, dispatch } from '../../api'
import { getShowList } from './helpers'
import { ListPaginated, UserListType, ShowType } from '../../types'
import { UserListPayload } from './types'

export const config = {
  runtime: 'edge',
}

export default async (req: Request) =>
  dispatch(async () => {
    const user = await authorize(req)

    const list: ListPaginated<MovieItem | TVShowItem> = {
      data: [],
      page: 0,
      pages: 0,
    }

    const { searchParams } = new URL(req.url)
    const page = Number(searchParams.get('page'))
    const showType = searchParams.get('showType') as ShowType
    const listType = searchParams.get('listType') as UserListType

    const payload: UserListPayload = {
      page,
      showType,
      listType,
      userId: user.id,
    }

    const { data, pages } = await getShowList(payload)

    if (data) {
      list.page = Number(page)
      list.pages = pages

      await Promise.all(
        data.map(async (row) => {
          try {
            const id = Number(row.show_id)
            const show =
              showType === 'movie'
                ? await tmdb.movies.details(id)
                : await tmdb.tvShows.details(id)

            if (show) {
              list.data.push(show)
            }
          } catch (e) {
            console.error(e)
          }
        })
      )
    }

    return list
  })
