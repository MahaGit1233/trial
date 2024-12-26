import React, { useState } from 'react';
import './App.css';
import MoviesList from './Components/MoviesList';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchMoviesHandler() {
    setIsLoading(true);

    const response = await fetch('https://swapi.py4e.com/api/films/')
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
      setIsLoading(false);
    },2000);
  }

  return (
    <React.Fragment>
      <section className='button'>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section className='load'>
        {isLoading && <div>Loading...</div>}
      </section>
      <section className='movies'>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  )
}

export default App;