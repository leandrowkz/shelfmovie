import React from 'react'
import type { MovieItem } from '@leandrowkz/tmdb'
import { render } from '@testing-library/react'
import { ShowList } from '.'
import { mockMovieDetails } from '../../__mocks__/mockMovieDetails'
import { BrowserRouter } from 'react-router-dom'

const makeSUT = () => {
  const mockMovies: MovieItem[] = []

  for (let i = 0; i < 10; i++) {
    mockMovies.push({ ...mockMovieDetails })
  }

  return { movies: mockMovies }
}

describe('ShowList', () => {
  test('Should render ShowList properly', async () => {
    const { movies } = makeSUT()
    const { container, getByText, queryByTestId } = render(
      <ShowList shows={movies} title="MOCK CAROUSEL TITLE" />,
      { wrapper: BrowserRouter }
    )

    const title = getByText('MOCK CAROUSEL TITLE')
    const pages = container.querySelectorAll('.page')
    const items = container.querySelectorAll('.show')
    const loader = queryByTestId('loader')

    expect(title).toBeInTheDocument()
    expect(loader).not.toBeInTheDocument()
    expect(pages.length).toEqual(10)
    expect(items.length).toEqual(10)
  })

  test('Should render Loader properly', async () => {
    const { movies } = makeSUT()
    const { container, getByText, getByTestId } = render(
      <ShowList shows={movies} title="MOCK CAROUSEL TITLE" isLoading />,
      { wrapper: BrowserRouter }
    )

    const title = getByText('MOCK CAROUSEL TITLE')
    const pages = container.querySelectorAll('.page')
    const items = container.querySelectorAll('.show')
    const loader = getByTestId('loader')

    expect(title).toBeInTheDocument()
    expect(loader).toBeInTheDocument()
    expect(pages.length).toEqual(0)
    expect(items.length).toEqual(0)
  })

  test('Should render properly when there are no items', async () => {
    const { container, queryByText, queryByTestId } = render(
      <ShowList shows={[]} title="MOCK CAROUSEL TITLE" />,
      { wrapper: BrowserRouter }
    )

    const title = queryByText('MOCK CAROUSEL TITLE')
    const pages = container.querySelectorAll('.page')
    const items = container.querySelectorAll('.show')
    const loader = queryByTestId('loader')

    expect(title).not.toBeInTheDocument()
    expect(loader).not.toBeInTheDocument()
    expect(pages.length).toEqual(0)
    expect(items.length).toEqual(0)
  })
})
