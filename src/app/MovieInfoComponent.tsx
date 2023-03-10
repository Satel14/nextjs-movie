import React, { useEffect, useState } from 'react';
import Axios from 'axios';

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Director: string;
  Actors: string;
  Plot: string;
  imdbRating: string;
}

interface Props {
  selectedMovie: string;
  onMovieSelect: () => void;
}

const MovieInfoComponent: React.FC<Props> = ({ selectedMovie, onMovieSelect }) => {
  const [movieInfo, setMovieInfo] = useState<Movie | undefined>();

  useEffect(() => {
    const fetchMovieInfo = async () => {
      try {
        const response = await Axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}?i=${selectedMovie}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
        setMovieInfo(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (selectedMovie) {
      fetchMovieInfo();
    }
  }, [selectedMovie]);


  return (
    <div className="movie-info">
      {movieInfo ? (
        <>
          <img src={movieInfo?.Poster} alt={movieInfo?.Title} />
          <div>
            <div>
              {movieInfo?.Type}: <span>{movieInfo?.Title}</span>
            </div>
            <div>
              Rated: <span>{movieInfo?.Rated}</span>
            </div>
            <div>
              Rating: <span>{movieInfo?.imdbRating}</span>
            </div>
            <div>
              Released: <span>{movieInfo?.Released}</span>
            </div>
            <div>
              Runtime: <span>{movieInfo?.Runtime}</span>
            </div>
            <div>
              Director: <span>{movieInfo?.Director}</span>
            </div>
            <div>
              Actors: <span>{movieInfo?.Actors}</span>
            </div>
            <div>
              Plot: <span>{movieInfo?.Plot}</span>
            </div>
          </div>
          <div onClick={onMovieSelect}>X</div>
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default MovieInfoComponent;


