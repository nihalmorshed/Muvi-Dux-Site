import React, { useState, useEffect } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

export default function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("movies.json")
      .then((resp) => resp.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="">
      <input
        className="search-input"
        type="text"
        placeholder="Enter Movie Name...."
      />
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard movie={movie}></MovieCard>
        ))}
      </div>
    </div>
  );
}
