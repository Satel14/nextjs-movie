import React, { useState } from 'react'
import AddFavorites from './AddFavorites';

interface Movie {
  Poster: string;
  Title: string;
  Year: string;
  imdbID: string;
}

interface Props {
  movies: Movie[];
  favoritesComponents: React.FC;
  onMovieSelect: (imdbID: string) => void;
  handleFavoritesClick: (movie: Movie) => void;
}

const MovieList: React.FC<Props> = ({ movies, favoritesComponents, onMovieSelect, handleFavoritesClick }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const moviesPerPVideo = 5;
  const indexOfLastMovie = currentPage * moviesPerPVideo;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPVideo;
   const currentMovies = movies.filter((movie, index) => {
    return index >= indexOfFirstMovie && index < indexOfLastMovie;
  });

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      {currentMovies.map((movie) =>
        <div className='image-container' key={movie.imdbID}>
          <img src={movie.Poster} alt="movie" className='image-container__box' onClick={() => { onMovieSelect(movie.imdbID) }} />
          <div className='favorite' onClick={() => handleFavoritesClick(movie)}>
            <AddFavorites />
          </div>
          <div className='container-description'>
            <div className='description'>
              <h6>Title: {movie.Title}</h6>
              <h6>Year of release: {movie.Year}</h6>
            </div>
          </div>
        </div>
      )}
      <div className="pagination">
        {movies.length > moviesPerPVideo && (
          <ul>
            {Array(Math.ceil(movies.length / moviesPerPVideo)).fill(0).map((_, i) => (
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                    <a href="#" className="page-link" onClick={() => paginate(i + 1)}>{i + 1}</a>
                  </li>
                </ul>
              </nav>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}

export default MovieList;
