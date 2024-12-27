import React, { useState, useRef } from 'react';
import './App.css';
import MoviesList from './Components/MoviesList';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const retryInterval = useRef(null);

  async function fetchMoviesHandler() {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.py4e.com/api/film/');
      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }

      const data = await response.json();
      setTimeout(() => {
        const transformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date,
          };
        });
        setMovies(transformedMovies);
      }, 1000);

      clearInterval(retryInterval.current);
    } catch (error) {
      setError(error.message);
      retryInterval.current = setTimeout(fetchMoviesHandler, 5000);
    }

    setIsLoading(false);
  }

  function cancelRetryHandler() {
    clearInterval(retryInterval.current);
    setError(null);
  }

  return (
    <React.Fragment>
      <section className="button">
        <button onClick={fetchMoviesHandler}>
          Fetch Movies
        </button>
      </section>
      <section className="load">
        {isLoading && <div>Loading...</div>}
        {!isLoading && error && (
          <div>
            <p>{error}</p>
            <button onClick={cancelRetryHandler}>Cancel Retry</button>
          </div>
        )}
      </section>
      <section className="movies">
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
