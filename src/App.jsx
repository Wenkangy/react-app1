import React, { useEffect, useState } from 'react';
import Search from './components/Search.jsx';
import Spinner from './components/spinner.jsx';

const API_URL = 'https://api.themoviedb.org/3';

const API_KEY = `eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTlhZjI0NTRlMDAzOWI5ZWU4ZTJjMDUzZjBkMTVmZCIsIm5iZiI6MTc1Nzg5MzIyOS42MDQsInN1YiI6IjY4Yzc1MjZkYjlmOWUyNDM5ZmUzMDAzYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DBkff_M8W1V2AopAttkjq0brATKwmC8TPYt11WanVqo`;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = `${API_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);

      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();

      if (data.Response === 'false') {
        setErrorMessage(data.Error || 'No movies found');
        setMovieList([]);
        return;
      }
      setMovieList(data.results || []);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setErrorMesaage('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main>
      <div className='Pattern' />
      <div className='wrapper'>
        <header>
          <img
            src='./hero.png'
            alt='helle banner'
          />

          <h1>
            Find <span className='text-gradient'>Movies</span> You Will Enjoy
            Without The Hassle
          </h1>

          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </header>
        <section>
          <h2>all movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className='text-white'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p
                  key={movie.id}
                  className='text-white'
                >
                  {movie.title}
                </p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
