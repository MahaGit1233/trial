import React, { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';
import MoviesList from './Components/MoviesList';
import MoviesForm from './Components/MoviesForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://react-api-73b69-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }

      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      console.log(loadedMovies);

      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  const saveDataHandler = useCallback(async (enteredData) => {
    const response = await fetch('https://react-api-73b69-default-rtdb.firebaseio.com/movies.json', {
      method: "POST",
      body: JSON.stringify(enteredData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }, []);

  function cancelRetryHandler() {
    setError(null);
  }

  const deleteDataHandler = async (id) => {
    const response = await fetch(`https://react-api-73b69-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setMovies((prevState) => prevState.filter((movie) => movie.id !== id));
  }

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
        <MoviesList movies={movies} onDelete={deleteDataHandler} />
      </section>
    </React.Fragment>
  );
}

export default App;
