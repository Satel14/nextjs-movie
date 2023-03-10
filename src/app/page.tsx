"use client";
import './globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MovieList from './MovieList';
import Search from './Search'
import AddFavorites from './AddFavorites';
import RemoveFavorites from './RemoveFavorites';
import MovieInfoComponent from './MovieInfoComponent';
import { Movie } from './types/movie'
export default function Home(props: any) {

  const [movies, setMovies] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [selectedMovie, onMovieSelect] = useState<string>('');
  const getMovieRequest = async (searchValue: any) => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}?i=${searchValue}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`

    const response = await fetch(url)
    const responseJson = await response.json()

    return responseJson;
  }

  useEffect(() => {
    getMovieRequest(searchValue).then((responseJson) => {
      if (responseJson.Search) {
        setMovies(responseJson.Search);
      } else {
        setMovies([]);
      }
    });
  }, [searchValue])

  useEffect(() => {
    const moveFavorites = JSON.parse(
      localStorage.getItem('nextjs-movie') || "{}"
    );
    setFavorites(moveFavorites)
  }, [])

  const addFavoritesMovie = (movie: any) => {
    if (favorites.some(fav => fav.imdbID === movie.imdbID)) {
      toast.error('This movie is already in your favorites list');
      return;
    }

    const newFavoriteList = [...favorites, movie]
    setFavorites(newFavoriteList)
    saveToLocalStorage(newFavoriteList)
    toast.success('Movie was successfully added to your favorites list');
  }

  const removeFavoritesMovie = (movie: any) => {
    const index = favorites.findIndex(favorite => favorite.imdbID === movie.imdbID)
    if (index !== -1) {
      const newFavoriteList = [...favorites]
      newFavoriteList.splice(index, 1)
      setFavorites(newFavoriteList)
      saveToLocalStorage(newFavoriteList)
      toast.success('Movie removed from favorites');
    }
  }

  const saveToLocalStorage = (items: any) => {
    localStorage.setItem('nextjs-movie', JSON.stringify(items))
  }
  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <div className='col'>
          <h1>Movies</h1>
        </div>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='infoMovies'>
        {selectedMovie && <MovieInfoComponent selectedMovie={selectedMovie} onMovieSelect={() => { onMovieSelect('') }} />}
      </div>
      <div className='container-movies'>

        {movies.length > 0 ? (
          <MovieList
            movies={movies}
            handleFavoritesClick={addFavoritesMovie}
            favoritesComponents={AddFavorites}
            onMovieSelect={onMovieSelect}
          />
        ) : (
          <div>No movies found.</div>
        )}
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <div className='col'>
          <h1>Favorites</h1>
        </div>
      </div>
      <div className='container-movies'>
        <MovieList movies={favorites} handleFavoritesClick={removeFavoritesMovie} favoritesComponents={RemoveFavorites} onMovieSelect={onMovieSelect} />
      </div>
      <ToastContainer />
    </div>
  )
}