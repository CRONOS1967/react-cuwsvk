import React, { useEffect, useState } from 'react';

import Moviecard from './Moviecard';
import './App.css';
import searchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com/?apikey=90e4cf6a';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchterm] = useState('');

  useEffect(() => {
    searchMovies('spiderman');
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  return (
    <div className="app">
      <h1>Movie Search</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(e) => {
            setSearchterm(e.target.value);
          }}
        />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
