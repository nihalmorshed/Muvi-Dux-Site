import React, { useState, useEffect } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [genre, setGenre] = useState("All Genre");
  const [rating, setRating] = useState("All");

  useEffect(() => {
    fetch("movies.json")
      .then((resp) => resp.json())
      .then((data) => setMovies(data));
  }, []);

  const handleSearchChange = (evnt) => {
    setSearchTerm(evnt.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="">
      <input
        className="search-input"
        type="text"
        placeholder="Enter Movie Name...."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>
            <select className="filter-dropdown">
              <option>All Genre</option>
              <option>Action</option>
              <option>Drama</option>
              <option>Fantasy</option>
              <option>Horror</option>
            </select>
          </label>
        </div>
        <div className="filter-slot">
          <label>
            <select className="filter-dropdown">
              <option>All</option>
              <option>Good</option>
              <option>OK</option>
              <option>Bad</option>
            </select>
          </label>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard movie={movie}></MovieCard>
        ))}
      </div>
    </div>
  );
}

// Search Logic Explaination
// - 'onChange' fires → "handleSearchChange" runs.
// - That updates "searchTerm" with the typed text.
// - Because the input’s value is tied to "searchTerm", the typed text immediately appears in the box.
