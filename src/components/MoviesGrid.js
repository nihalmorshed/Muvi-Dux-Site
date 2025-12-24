import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid({ movies, watchlist, toggleWatchlist }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [genre, setGenre] = useState("All Genre");
  const [rating, setRating] = useState("All");

  const matchesGenre = (genre, movie) => {
    return (
      genre === "All Genre" || movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const machesSearchTerm = (movie) => {
    return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return movie.rating >= 8;
      case "Ok":
        return movie.rating >= 5 && movie.rating < 8;
      case "Bad":
        return movie.rating < 5;
      default:
        return false;
    }
  };
  const handleSearchChange = (evnt) => {
    setSearchTerm(evnt.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      matchesGenre(genre, movie) &&
      matchesRating(movie, rating) &&
      machesSearchTerm(movie)
    );
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
            <select
              className="filter-dropdown"
              value={genre}
              onChange={handleGenreChange}
            >
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
            <select
              className="filter-dropdown"
              value={rating}
              onChange={handleRatingChange}
            >
              <option>All</option>
              <option>Good</option>
              <option>Ok</option>
              <option>Bad</option>
            </select>
          </label>
        </div>
      </div>
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            movie={movie}
            toggleWatchlist={toggleWatchlist}
            isWatchlisted={watchlist.includes(movie.id)}
          ></MovieCard>
        ))}
      </div>
    </div>
  );
}

// Search Logic Explanation
// - 'onChange' fires → "handleSearchChange" runs.
// - That updates "searchTerm" with the typed text.
// - Because the input’s value is tied to "searchTerm", the typed text immediately appears in the box.
