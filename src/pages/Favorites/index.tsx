import React, { useContext, useEffect } from 'react'
import { Page } from '../../components/Page'
import { Heading } from 'src/components/Heading'
import { Container } from 'src/components/Container'
import { FavoritesContext } from 'src/context/FavoritesContext'
import { ShowList } from 'src/components/ShowList'
import styles from './styles.module.css'
import { AuthContext } from 'src/context/AuthContext'
import { useNavigate } from 'react-router-dom'

export function Favorites(): JSX.Element {
  const navigate = useNavigate()
  const { session } = useContext(AuthContext)
  const {
    movies,
    tvShows,
    isLoadingMoviesFavorites,
    isLoadingTVShowsFavorites,
    fetchMoviesFavorites,
    fetchTVShowsFavorites,
  } = useContext(FavoritesContext)

  if (!session) {
    navigate('/sign-up')
    return <></>
  }

  useEffect(() => {
    fetchMoviesFavorites()
    fetchTVShowsFavorites()
  }, [])

  return (
    <Page>
      <Container>
        <Heading level={1} title="💜 Favorites" />
        <ShowList
          shows={movies}
          type="movie"
          title="Your favorite movies"
          isLoading={isLoadingMoviesFavorites}
          data-testid="list-movies"
          className={styles.list}
        />
        <ShowList
          shows={tvShows}
          type="tv"
          title="Your favorite TV Shows"
          isLoading={isLoadingTVShowsFavorites}
          data-testid="list-tv-shows"
        />
      </Container>
    </Page>
  )
}