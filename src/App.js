import React, { useState, useEffect } from "react";
import "./App.css";
import "./counter.css";
import SearchIcon from "./search.svg";
import MovieCard  from "./MovieCard";

// OMDB api key: c14c64ec
// const OMDB_API_KEY = "c14c64ec";
const Api_url = `http://www.omdbapi.com/?apikey=c14c64ec`;

const App = () => {
  const [searchTerm, setsearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies('Spiderman');
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${Api_url}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
    console.log(movies);
  };
  const enterHandler = (e) => {
    if (e.key == 'Enter') {
      searchMovies(searchTerm)
    }
  }
  return (
    <div className="app">
      <h1 >Movie Zone</h1>
      <div className="search">
        <input
          type="text"
          value={searchTerm}
          placeholder="Enter a Movie name"
          onKeyUp={enterHandler}
          onChange={(e) => {
            setsearchTerm(e.target.value);
          }}
        />
        <img src={SearchIcon} alt="Search Icon" onClick={()=>{searchMovies(searchTerm)}} />
      </div>

      {
        movies?.length > 0 ? (
          <div className="container"> 
            {
              movies.map( (movie)=> (<MovieCard movie = {movie} />))
            }
          </div>
        ) : (
          <div className="empty">
            <h2>No movies found </h2>
          </div>
        )
      }
    </div>
  );
};

export default App;
