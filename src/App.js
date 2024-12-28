import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';
import MoviesList from './Components/MoviesList';
import MoviesForm from './Components/MoviesForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const retryInterval = useRef(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.py4e.com/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }

      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);

      clearInterval(retryInterval.current);
    } catch (error) {
      setError(error.message);
      retryInterval.current = setTimeout(fetchMoviesHandler, 5000);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function cancelRetryHandler() {
    clearInterval(retryInterval.current);
    setError(null);
  }

  const saveDataHandler = useCallback((enteredData) => {
    setMovies((prevState) => [enteredData, ...prevState]);
  }, []);

  return (
    <React.Fragment>
      <MoviesForm onSaveData={saveDataHandler} />
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
