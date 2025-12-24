import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoviesGrid from "./components/MoviesGrid";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Watchlist from "./components/Watchlist";
import { useEffect, useState } from "react";
function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]); // watchlist is an array of movieIds

  useEffect(() => {
    fetch("movies.json")
      .then((resp) => resp.json())
      .then((data) => setMovies(data));
  }, []);

  const toggleWatchlist = (movieId) => {
    setWatchlist((prev) => {
      // "prev" represents the previous value of the watchlist
      return prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]; // state in react is immutable ; must be changed using spread operator
    });

    // prev = watchlist = [101, 102, 103]; // movie IDs
    // toggleWatchlist(102);
    // prev.includes(102) → true
    // runs prev.filter((id) => id != 102) -> Result: [101, 103]
  };
  return (
    <div className="App">
      <div className="container">
        <Header></Header>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            ></Route>
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>

      <Footer></Footer>
    </div>
  );
}

export default App;
