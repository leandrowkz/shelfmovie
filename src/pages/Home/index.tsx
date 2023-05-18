import React, { useContext, useEffect } from 'react'
import { ScrollRestoration } from 'react-router-dom'
import { Banner } from '../../components/Banner'
import { Page } from '../../components/Page'
import { ShowCarousel } from '../../components/ShowCarousel'
import { MovieListsContext } from '../../store/MovieListsContext'
import styles from './styles.module.css'

export function Home() {
  const {
    family,
    trending,
    mostPopular,
    bestComedies,
    inTheatres,
    scifiAndFantasy,
    topRatedDocumentaries,
    isLoadingBestComedies,
    isLoadingFamily,
    isLoadingInTheatres,
    isLoadingMostPopular,
    isLoadingScifiAndFantasy,
    isLoadingTopRatedDocumentaries,
    isLoadingTrending,
    fetchTrending,
    fetchMostPopular,
    fetchBestComedies,
    fetchScifiAndFantasy,
    fetchFamily,
    fetchTopRatedDocumentaries,
    fetchInTheatres,
  } = useContext(MovieListsContext)

  useEffect(() => {
    fetchMostPopular()
    fetchInTheatres()
    fetchTrending()
    fetchBestComedies()
    fetchScifiAndFantasy()
    fetchFamily()
    fetchTopRatedDocumentaries()
  }, [])

  return (
    <Page className={styles.home}>
      <ScrollRestoration />
      <Banner
        shows={trending}
        className={styles.banner}
        isLoading={isLoadingTrending}
        data-testid="banner"
      />
      <ShowCarousel
        title="In theaters"
        shows={inTheatres}
        isLoading={isLoadingInTheatres}
        size="large"
        data-testid="carousel-in-theaters"
      />
      <ShowCarousel
        title="Most popular"
        shows={mostPopular}
        isLoading={isLoadingMostPopular}
        data-testid="carousel-most-popular"
      />
      <ShowCarousel
        title="Best comedies"
        shows={bestComedies}
        isLoading={isLoadingBestComedies}
        data-testid="carousel-best-comedies"
      />
      <ShowCarousel
        title="Sci-Fi & fantasy"
        shows={scifiAndFantasy}
        isLoading={isLoadingScifiAndFantasy}
        data-testid="carousel-sci-fi-fantasy"
      />
      <ShowCarousel
        title="Family"
        shows={family}
        isLoading={isLoadingFamily}
        data-testid="carousel-family"
      />
      <ShowCarousel
        title="Top rated documentaries"
        shows={topRatedDocumentaries}
        isLoading={isLoadingTopRatedDocumentaries}
        data-testid="carousel-top-rated-documentaries"
      />
    </Page>
  )
}
