# MovieServo - Technical Documentation

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Structure](#2-project-structure)
3. [Dependencies & Configuration](#3-dependencies--configuration)
4. [Application Architecture](#4-application-architecture)
5. [React Components - Detailed Analysis](#5-react-components---detailed-analysis)
6. [Hooks Implementation](#6-hooks-implementation)
7. [State Management](#7-state-management)
8. [Routing Configuration](#8-routing-configuration)
9. [Data Layer & API Integration](#9-data-layer--api-integration)
10. [Filtering & Search Logic](#10-filtering--search-logic)
11. [Watchlist Functionality](#11-watchlist-functionality)
12. [Styling Architecture](#12-styling-architecture)
13. [Configuration Files](#13-configuration-files)
14. [Component Interaction Flow](#14-component-interaction-flow)
15. [Git Development History](#15-git-development-history)
16. [Technical Considerations](#16-technical-considerations)

---

## 1. Project Overview

**MovieServo** is a single-page React application designed for browsing and managing a personal movie watchlist. The application allows users to search through a catalog of movies, filter by genre and rating, and maintain a personalized watchlist that persists across page navigation.

### Key Features

| Feature | Description |
|---------|-------------|
| Movie Catalog | Display of 20 movies with posters, titles, genres, and ratings |
| Search | Real-time title search with case-insensitive matching |
| Genre Filter | Dropdown filter supporting Action, Drama, Fantasy, Horror |
| Rating Filter | Classification system (Good/Ok/Bad) based on numerical rating |
| Watchlist | Add/remove movies with toggle switch; dedicated watchlist page |
| Client-Side Routing | SPA navigation between Home and Watchlist pages |
| Responsive Design | CSS Grid-based layout adapting to viewport width |
| Dark Theme | Netflix-inspired dark aesthetic with color-coded ratings |

### Technology Stack

- **Frontend Framework:** React 19.2.3
- **Routing:** React Router DOM 7.11.0
- **Build Tool:** Create React App (react-scripts 5.0.1)
- **Styling:** Vanilla CSS (no preprocessors)
- **Testing:** Jest + React Testing Library
- **Performance:** Web Vitals integration
- **Version Control:** Git

---

## 2. Project Structure

```
movieservo/
├── public/
│   ├── images/                    # Movie poster images
│   │   ├── 1.jpg - 20.jpg        # Individual movie posters
│   │   └── default.jpg           # Fallback image for errors
│   ├── fav.png                    # Browser favicon
│   ├── logo.png                   # Application logo
│   ├── index.html                 # HTML entry point
│   ├── manifest.json              # PWA configuration
│   ├── movies.json                # Static movie data source
│   └── robots.txt                 # SEO crawler directives
│
├── src/
│   ├── components/                # React components directory
│   │   ├── Header.js              # Application header component
│   │   ├── Footer.js              # Application footer component
│   │   ├── MoviesGrid.js          # Main movie grid with filtering
│   │   ├── MovieCard.js           # Individual movie card component
│   │   └── Watchlist.js           # Watchlist page component
│   │
│   ├── App.js                     # Root application component
│   ├── App.css                    # App-level styles (legacy)
│   ├── App.test.js                # Application test file
│   ├── index.js                   # React DOM entry point
│   ├── index.css                  # Global typography styles
│   ├── styles.css                 # Main stylesheet
│   ├── logo.svg                   # SVG logo asset
│   ├── setupTests.js              # Jest configuration
│   └── reportWebVitals.js         # Performance monitoring
│
├── node_modules/                  # Installed dependencies
├── package.json                   # Project configuration
├── package-lock.json              # Dependency lock file
├── .gitignore                     # Git ignore rules
└── README.md                      # Project readme
```

### Directory Purposes

| Directory | Purpose |
|-----------|---------|
| `public/` | Static assets served directly; includes HTML template, images, and data |
| `public/images/` | Movie poster JPG files (1.jpg through 20.jpg) plus default fallback |
| `src/` | React source code and application logic |
| `src/components/` | Reusable React component files |
| `node_modules/` | Third-party dependency packages |

---

## 3. Dependencies & Configuration

### package.json Configuration

```json
{
  "name": "movieservo",
  "version": "0.1.0",
  "private": true
}
```

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 19.2.3 | Core React library for building UI components |
| `react-dom` | 19.2.3 | React rendering for web browsers |
| `react-router-dom` | 7.11.0 | Client-side routing and navigation |
| `react-scripts` | 5.0.1 | Create React App build tooling |
| `web-vitals` | 2.1.4 | Core Web Vitals performance metrics |

### Development/Testing Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@testing-library/react` | 16.3.1 | React component testing utilities |
| `@testing-library/jest-dom` | 6.9.1 | Custom Jest DOM matchers |
| `@testing-library/dom` | 10.4.1 | DOM testing utilities |
| `@testing-library/user-event` | 13.5.0 | User interaction simulation |

### NPM Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `start` | `react-scripts start` | Runs development server on port 3000 |
| `build` | `react-scripts build` | Creates optimized production build |
| `test` | `react-scripts test` | Runs Jest test suite |
| `eject` | `react-scripts eject` | Ejects from Create React App (irreversible) |

### ESLint Configuration

```json
{
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  }
}
```

### Browser Support (browserslist)

**Production:**
- `>0.2%` - Browsers with more than 0.2% market share
- `not dead` - Browsers with active development
- `not op_mini all` - Excludes Opera Mini

**Development:**
- `last 1 chrome version`
- `last 1 firefox version`
- `last 1 safari version`

---

## 4. Application Architecture

### Architectural Pattern

MovieServo follows a **Lift State Up** pattern where the root component (`App.js`) manages shared application state and passes it down to child components via props.

### Component Hierarchy

```
App (Root Component)
│
├── Header (Presentational)
│   └── Logo + Subtitle
│
├── BrowserRouter (Router Provider)
│   │
│   ├── Navigation (nav element)
│   │   ├── Link → "/" (Home)
│   │   └── Link → "/watchlist" (Watchlist)
│   │
│   └── Routes
│       │
│       ├── Route "/" → MoviesGrid
│       │   └── MovieCard (mapped for each movie)
│       │
│       └── Route "/watchlist" → Watchlist
│           └── MovieCard (mapped for watchlist items)
│
└── Footer (Presentational)
    └── Copyright + Attribution
```

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        App.js                               │
│  ┌────────────────┐    ┌────────────────────────────────┐  │
│  │ movies: []     │    │ watchlist: []                  │  │
│  │ (useState)     │    │ (useState)                     │  │
│  └───────┬────────┘    └───────────────┬────────────────┘  │
│          │                             │                    │
│          │    ┌────────────────────────┤                    │
│          │    │                        │                    │
│          ▼    ▼                        ▼                    │
│  ┌───────────────────┐    ┌───────────────────────────┐    │
│  │   MoviesGrid      │    │   toggleWatchlist(id)     │    │
│  │   (props:         │    │   ┌─────────────────┐     │    │
│  │    - movies       │◄───┤   │ If in list:     │     │    │
│  │    - watchlist    │    │   │   Remove ID     │     │    │
│  │    - toggle...)   │    │   │ Else:           │     │    │
│  └─────────┬─────────┘    │   │   Add ID        │     │    │
│            │              │   └─────────────────┘     │    │
│            ▼              │                           │    │
│  ┌───────────────────┐    │                           │    │
│  │   MovieCard       │────┘                           │    │
│  │   (onClick →      │                                │    │
│  │    toggleWatchlist)│                               │    │
│  └───────────────────┘                                │    │
└─────────────────────────────────────────────────────────────┘
```

### State Management Strategy

1. **Centralized State:** All shared state lives in `App.js`
2. **Prop Drilling:** State and callbacks passed down through component tree
3. **Immutable Updates:** State changes use spread operator for immutability
4. **Local State:** Component-specific state (filters, search) managed locally

---

## 5. React Components - Detailed Analysis

### 5.1 App.js - Root Component

**File Path:** `src/App.js`

**Purpose:** Main application orchestrator managing global state, routing, and navigation.

#### Imports

```javascript
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./styles.css";
import Header from "./components/Header";
import MoviesGrid from "./components/MoviesGrid";
import Footer from "./components/Footer";
import Watchlist from "./components/Watchlist";
```

#### State Declarations

```javascript
const [movies, setMovies] = useState([]);
const [watchlist, setWatchlist] = useState([]);
```

| State Variable | Type | Initial Value | Purpose |
|----------------|------|---------------|---------|
| `movies` | Array | `[]` | Stores all movies loaded from JSON |
| `watchlist` | Array | `[]` | Stores IDs of movies added to watchlist |

#### useEffect - Data Fetching

```javascript
useEffect(() => {
  fetch("movies.json")
    .then((resp) => resp.json())
    .then((data) => setMovies(data));
}, []);
```

**Behavior:**
- Runs once on component mount (empty dependency array `[]`)
- Fetches `movies.json` from public folder
- Parses JSON response
- Updates `movies` state with fetched data
- No cleanup function required

#### toggleWatchlist Function

```javascript
const toggleWatchlist = (movieId) => {
  setWatchlist((prev) => {
    if (prev.includes(movieId)) {
      return prev.filter((id) => id !== movieId);
    }
    return [...prev, movieId];
  });
};
```

**Logic Flow:**

```
toggleWatchlist(movieId)
        │
        ▼
┌───────────────────────┐
│ Is movieId in prev?   │
└───────────┬───────────┘
            │
    ┌───────┴───────┐
    │               │
   YES              NO
    │               │
    ▼               ▼
┌─────────┐   ┌─────────────┐
│ Filter  │   │ Spread prev │
│ out ID  │   │ + add ID    │
└─────────┘   └─────────────┘
    │               │
    └───────┬───────┘
            │
            ▼
   Return new array
   (immutable update)
```

**Key Implementation Details:**
- Uses functional state update for safe concurrent updates
- `prev.filter()` creates new array for removal (immutability)
- Spread operator `[...prev, movieId]` creates new array for addition
- Never mutates existing state directly

#### JSX Structure

```jsx
return (
  <div className="app">
    <Header />
    <BrowserRouter>
      <nav className="navigation">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/watchlist">Watchlist</Link>
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
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              movies={movies}
              watchlist={watchlist}
              toggleWatchlist={toggleWatchlist}
            />
          }
        />
      </Routes>
    </BrowserRouter>
    <Footer />
  </div>
);
```

---

### 5.2 Header.js - Header Component

**File Path:** `src/components/Header.js`

**Purpose:** Renders application header with branding elements.

**Component Type:** Pure Presentational (no state, no hooks)

#### Implementation

```javascript
import React from "react";

const Header = () => {
  return (
    <div className="header">
      <img src="logo.png" alt="Logo" className="logo" />
      <h4 className="app-subtitle">Find your next Movie here!</h4>
    </div>
  );
};

export default Header;
```

#### Props

None - This is a static presentational component.

#### Rendered Elements

| Element | Class | Content |
|---------|-------|---------|
| `div` | `header` | Container for header content |
| `img` | `logo` | Logo image from `public/logo.png` |
| `h4` | `app-subtitle` | Tagline text |

---

### 5.3 Footer.js - Footer Component

**File Path:** `src/components/Footer.js`

**Purpose:** Renders application footer with dynamic copyright year.

**Component Type:** Pure Presentational (no React hooks)

#### Implementation

```javascript
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p className="footer-text">
        &copy; {currentYear} MuviServo. All rights reserved. Created by Nihal Morshed.
      </p>
    </footer>
  );
};

export default Footer;
```

#### Dynamic Year Calculation

```javascript
const currentYear = new Date().getFullYear();
```

- Creates new Date object at render time
- Extracts 4-digit year (e.g., 2025)
- Interpolated into copyright text

#### Props

None - Static component with dynamic date.

---

### 5.4 MoviesGrid.js - Main Grid Component

**File Path:** `src/components/MoviesGrid.js`

**Purpose:** Displays searchable and filterable grid of movie cards.

**Component Type:** Stateful Container Component

#### Imports

```javascript
import React, { useState } from "react";
import MovieCard from "./MovieCard";
```

#### Props Interface

| Prop | Type | Description |
|------|------|-------------|
| `movies` | `Array<Movie>` | Array of all movie objects |
| `watchlist` | `Array<number>` | Array of movie IDs in watchlist |
| `toggleWatchlist` | `Function` | Callback to add/remove from watchlist |

#### State Declarations

```javascript
const [searchTerm, setSearchTerm] = useState("");
const [genre, setGenre] = useState("All Genre");
const [rating, setRating] = useState("All");
```

| State | Type | Default | Purpose |
|-------|------|---------|---------|
| `searchTerm` | String | `""` | User's search input text |
| `genre` | String | `"All Genre"` | Selected genre filter |
| `rating` | String | `"All"` | Selected rating filter |

#### Filter Functions

**1. Genre Matching**

```javascript
const matchesGenre = (genre, movie) => {
  return (
    genre === "All Genre" ||
    genre.toLowerCase() === movie.genre.toLowerCase()
  );
};
```

| Input | Output |
|-------|--------|
| `"All Genre", any movie` | `true` |
| `"Action", {genre: "action"}` | `true` |
| `"Drama", {genre: "Action"}` | `false` |

**2. Search Term Matching**

```javascript
const machesSearchTerm = (movie) => {
  return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
};
```

> **Note:** Function name contains typo (`machesSearchTerm` instead of `matchesSearchTerm`)

| searchTerm | movie.title | Result |
|------------|-------------|--------|
| `""` | Any | `true` |
| `"dark"` | `"Dark Storm"` | `true` |
| `"STORM"` | `"Dark Storm"` | `true` |
| `"xyz"` | `"Dark Storm"` | `false` |

**3. Rating Matching**

```javascript
const matchesRating = (movie, rating) => {
  switch (rating) {
    case "Good":
      return movie.rating >= 8;
    case "Ok":
      return movie.rating >= 5 && movie.rating < 8;
    case "Bad":
      return movie.rating < 5;
    default:
      return true;
  }
};
```

| Rating Filter | Condition | Example Ratings |
|---------------|-----------|-----------------|
| `"Good"` | `>= 8` | 8.0, 8.5, 9.3, 9.8 |
| `"Ok"` | `>= 5 && < 8` | 5.0, 6.5, 7.9 |
| `"Bad"` | `< 5` | 1.7, 4.0, 4.9 |
| `"All"` | Always true | Any rating |

#### Filtered Movies Computation

```javascript
const filteredMovies = movies.filter(
  (movie) =>
    matchesGenre(genre, movie) &&
    machesSearchTerm(movie) &&
    matchesRating(movie, rating)
);
```

**Filter Chain Logic:**

```
movies.filter()
       │
       ├── matchesGenre(genre, movie)    → true/false
       │           AND
       ├── machesSearchTerm(movie)       → true/false
       │           AND
       └── matchesRating(movie, rating)  → true/false
                    │
                    ▼
            If ALL true → Include in filteredMovies
            If ANY false → Exclude from filteredMovies
```

#### Event Handlers

```javascript
const handleSearchChange = (e) => {
  setSearchTerm(e.target.value);
};

const handleGenreChange = (e) => {
  setGenre(e.target.value);
};

const handleRatingChange = (e) => {
  setRating(e.target.value);
};
```

All handlers follow the controlled component pattern:
1. Receive event object from input
2. Extract value from `e.target.value`
3. Update corresponding state

#### JSX Structure

```jsx
return (
  <div>
    {/* Search Input */}
    <input
      type="text"
      placeholder="Search movies..."
      className="search-input"
      value={searchTerm}
      onChange={handleSearchChange}
    />

    {/* Filter Dropdowns */}
    <div className="filter-bar">
      <div className="filter-slot">
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
      </div>
    </div>

    {/* Movies Grid */}
    <div className="movies-grid">
      {filteredMovies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          toggleWatchlist={toggleWatchlist}
          isWatchlisted={watchlist.includes(movie.id)}
        />
      ))}
    </div>
  </div>
);
```

---

### 5.5 MovieCard.js - Individual Card Component

**File Path:** `src/components/MovieCard.js`

**Purpose:** Renders individual movie card with image, info, and watchlist toggle.

**Component Type:** Presentational with helper functions

#### Props Interface

| Prop | Type | Description |
|------|------|-------------|
| `movie` | `Object` | Movie object with id, title, image, genre, rating |
| `toggleWatchlist` | `Function` | Callback receiving movie.id |
| `isWatchlisted` | `Boolean` | Whether movie is currently in watchlist |

#### Movie Object Structure

```javascript
{
  id: number,        // Unique identifier (1-20)
  title: string,     // Movie title
  image: string,     // Filename (e.g., "1.jpg")
  genre: string,     // Genre category
  rating: string     // Numerical rating as string
}
```

#### Helper Functions

**1. Image Error Handler**

```javascript
const handleImageError = (e) => {
  e.target.src = "images/default.jpg";
};
```

**Behavior:**
- Triggered when image fails to load (404, network error)
- Replaces broken image src with default fallback
- Provides graceful degradation

**2. Rating Class Calculator**

```javascript
const getRatingClass = (rating) => {
  if (rating >= 8) return "rating-good";    // Green
  if (rating >= 5) return "rating-ok";       // Orange
  return "rating-bad";                       // Red
};
```

**CSS Class Mapping:**

| Rating Range | Class | Color |
|--------------|-------|-------|
| `>= 8.0` | `rating-good` | Green `rgb(148, 255, 105)` |
| `5.0 - 7.99` | `rating-ok` | Orange `rgb(255, 209, 123)` |
| `< 5.0` | `rating-bad` | Red `rgb(255, 123, 123)` |

#### JSX Structure

```jsx
return (
  <div className="movie-card">
    {/* Movie Poster */}
    <img
      src={`images/${movie.image}`}
      alt={movie.title}
      onError={handleImageError}
    />

    {/* Movie Information */}
    <div className="movie-card-info">
      <h3 className="movie-card-title">{movie.title}</h3>
      <p>
        <span className="movie-card-genre">{movie.genre}</span>
        <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
          {movie.rating}
        </span>
      </p>

      {/* Watchlist Toggle */}
      <label className="switch">
        <input
          type="checkbox"
          checked={isWatchlisted}
          onChange={() => toggleWatchlist(movie.id)}
        />
        <span className="slider"></span>
        <span className="slider-label">
          {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
        </span>
      </label>
    </div>
  </div>
);
```

#### Toggle Switch Implementation

The toggle switch is a custom-styled HTML checkbox:

```
┌─────────────────────────────────────────┐
│  ┌──┐                                   │
│  │  │  Add to Watchlist                 │  (Unchecked)
│  └──┘                                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│                                   ┌──┐  │
│                    In Watchlist   │  │  │  (Checked)
│                                   └──┘  │
└─────────────────────────────────────────┘
```

**Elements:**
- `label.switch` - Container with relative positioning
- `input[type="checkbox"]` - Hidden native checkbox
- `span.slider` - Visual track (150px wide)
- `span.slider-label` - Dynamic text label

---

### 5.6 Watchlist.js - Watchlist Page Component

**File Path:** `src/components/Watchlist.js`

**Purpose:** Dedicated page displaying only watchlisted movies.

**Component Type:** Presentational (receives all data via props)

#### Props Interface

| Prop | Type | Description |
|------|------|-------------|
| `movies` | `Array<Movie>` | All movies (for lookup by ID) |
| `watchlist` | `Array<number>` | Array of movie IDs in watchlist |
| `toggleWatchlist` | `Function` | Callback to remove from watchlist |

#### Implementation

```javascript
import React from "react";
import MovieCard from "./MovieCard";

const Watchlist = ({ movies, watchlist, toggleWatchlist }) => {
  return (
    <div className="title">
      <h1>Your Watchlist</h1>
      <div className="watchlist-grid">
        {watchlist.map((id) => {
          const movie = movies.find((movie) => movie.id === id);
          return (
            <MovieCard
              key={id}
              movie={movie}
              toggleWatchlist={toggleWatchlist}
              isWatchlisted={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Watchlist;
```

#### Rendering Logic

```
watchlist = [3, 7, 15]    // IDs of watchlisted movies
movies = [{id:1,...}, {id:2,...}, ... {id:20,...}]

For each ID in watchlist:
    │
    ▼
┌─────────────────────────────────┐
│ movies.find(movie => movie.id === id) │
│                                       │
│ id=3  → finds movie with id=3         │
│ id=7  → finds movie with id=7         │
│ id=15 → finds movie with id=15        │
└─────────────────────────────────┘
    │
    ▼
Render MovieCard for each found movie
with isWatchlisted={true}
```

---

## 6. Hooks Implementation

### 6.1 useState Hook Usage

#### Location 1: App.js - Movies State

```javascript
const [movies, setMovies] = useState([]);
```

| Property | Value |
|----------|-------|
| Initial Value | Empty array `[]` |
| Updated By | `setMovies(data)` in useEffect |
| Used By | MoviesGrid, Watchlist components |
| Update Frequency | Once (on mount) |

#### Location 2: App.js - Watchlist State

```javascript
const [watchlist, setWatchlist] = useState([]);
```

| Property | Value |
|----------|-------|
| Initial Value | Empty array `[]` |
| Updated By | `toggleWatchlist()` function |
| Used By | MoviesGrid, Watchlist, MovieCard |
| Update Frequency | On each toggle click |

#### Location 3: MoviesGrid.js - Search Term

```javascript
const [searchTerm, setSearchTerm] = useState("");
```

| Property | Value |
|----------|-------|
| Initial Value | Empty string `""` |
| Updated By | `handleSearchChange()` |
| Used By | `machesSearchTerm()` filter |
| Update Frequency | On each keystroke |

#### Location 4: MoviesGrid.js - Genre Filter

```javascript
const [genre, setGenre] = useState("All Genre");
```

| Property | Value |
|----------|-------|
| Initial Value | `"All Genre"` |
| Updated By | `handleGenreChange()` |
| Used By | `matchesGenre()` filter |
| Update Frequency | On dropdown change |

#### Location 5: MoviesGrid.js - Rating Filter

```javascript
const [rating, setRating] = useState("All");
```

| Property | Value |
|----------|-------|
| Initial Value | `"All"` |
| Updated By | `handleRatingChange()` |
| Used By | `matchesRating()` filter |
| Update Frequency | On dropdown change |

### 6.2 useEffect Hook Usage

#### Location: App.js - Data Fetching

```javascript
useEffect(() => {
  fetch("movies.json")
    .then((resp) => resp.json())
    .then((data) => setMovies(data));
}, []);
```

**Behavior Analysis:**

| Aspect | Detail |
|--------|--------|
| Dependency Array | `[]` (empty) |
| Execution | Once, after initial render |
| Side Effect | Network request to fetch movies.json |
| Cleanup | None required |

**Execution Timeline:**

```
Component Mount
      │
      ▼
Initial Render (movies = [])
      │
      ▼
useEffect runs
      │
      ▼
fetch("movies.json")
      │
      ▼
.then() - Parse JSON
      │
      ▼
.then() - setMovies(data)
      │
      ▼
State Update triggers re-render
      │
      ▼
Re-render with populated movies
```

### 6.3 Hooks Summary by Component

| Component | useState Count | useEffect Count | Custom Hooks |
|-----------|---------------|-----------------|--------------|
| App.js | 2 | 1 | None |
| MoviesGrid.js | 3 | 0 | None |
| Header.js | 0 | 0 | None |
| Footer.js | 0 | 0 | None |
| MovieCard.js | 0 | 0 | None |
| Watchlist.js | 0 | 0 | None |

---

## 7. State Management

### 7.1 State Architecture

MovieServo uses a **Lift State Up** pattern where shared state resides in the nearest common ancestor component.

```
┌────────────────────────────────────────────────────────┐
│                      App.js                            │
│  ┌─────────────────────────────────────────────────┐  │
│  │  movies: Array<Movie>     watchlist: Array<ID>  │  │
│  │  └── From API fetch       └── User interactions │  │
│  └─────────────────────────────────────────────────┘  │
│                         │                              │
│            ┌────────────┴────────────┐                │
│            │                         │                │
│            ▼                         ▼                │
│    ┌───────────────┐        ┌───────────────┐        │
│    │  MoviesGrid   │        │   Watchlist   │        │
│    │  ┌─────────┐  │        │               │        │
│    │  │ Local:  │  │        │  (No local    │        │
│    │  │-search  │  │        │   state)      │        │
│    │  │-genre   │  │        │               │        │
│    │  │-rating  │  │        │               │        │
│    │  └─────────┘  │        │               │        │
│    └───────┬───────┘        └───────┬───────┘        │
│            │                        │                │
│            ▼                        ▼                │
│    ┌───────────────┐        ┌───────────────┐        │
│    │  MovieCard    │        │  MovieCard    │        │
│    │  (No state)   │        │  (No state)   │        │
│    └───────────────┘        └───────────────┘        │
└────────────────────────────────────────────────────────┘
```

### 7.2 State Flow Patterns

**Pattern 1: Data Down (Props)**

```
App (movies, watchlist)
    │
    ├─── props ──→ MoviesGrid
    │                  │
    │                  └─── props ──→ MovieCard
    │
    └─── props ──→ Watchlist
                       │
                       └─── props ──→ MovieCard
```

**Pattern 2: Events Up (Callbacks)**

```
MovieCard
    │
    └─── onClick ──→ toggleWatchlist(id)
                          │
                          ▼
                    App.setWatchlist()
                          │
                          ▼
                    State Update
                          │
                          ▼
                    Re-render cascade
```

### 7.3 Immutable State Updates

All state updates follow immutability principles:

**Adding to Watchlist:**
```javascript
setWatchlist(prev => [...prev, movieId]);
// Creates new array, doesn't mutate prev
```

**Removing from Watchlist:**
```javascript
setWatchlist(prev => prev.filter(id => id !== movieId));
// filter() returns new array, doesn't mutate prev
```

**Why Immutability Matters:**
1. React uses reference comparison for re-renders
2. Predictable state changes
3. Enables time-travel debugging
4. Prevents subtle mutation bugs

---

## 8. Routing Configuration

### 8.1 Router Setup

**Library:** `react-router-dom@7.11.0`

**Router Type:** `BrowserRouter` (HTML5 History API)

#### Implementation in App.js

```javascript
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Inside component return:
<BrowserRouter>
  <nav className="navigation">
    <Link className="nav-link" to="/">Home</Link>
    <Link className="nav-link" to="/watchlist">Watchlist</Link>
  </nav>
  <Routes>
    <Route path="/" element={<MoviesGrid ... />} />
    <Route path="/watchlist" element={<Watchlist ... />} />
  </Routes>
</BrowserRouter>
```

### 8.2 Route Definitions

| Path | Component | Props Passed |
|------|-----------|--------------|
| `/` | `MoviesGrid` | movies, watchlist, toggleWatchlist |
| `/watchlist` | `Watchlist` | movies, watchlist, toggleWatchlist |

### 8.3 Navigation Links

| Link Text | Target Path | Class |
|-----------|-------------|-------|
| Home | `/` | `nav-link` |
| Watchlist | `/watchlist` | `nav-link` |

### 8.4 Routing Behavior

**Client-Side Navigation:**
- No full page reload on link click
- JavaScript intercepts navigation
- Updates browser history
- React re-renders appropriate component

**State Persistence:**
- Watchlist state persists across route changes
- Filter state (search, genre, rating) resets on navigation
- Movies data remains loaded

---

## 9. Data Layer & API Integration

### 9.1 Data Source

**File:** `public/movies.json`

**Type:** Static JSON file served from public directory

**Fetch URL:** `"movies.json"` (relative to public root)

### 9.2 Movie Data Schema

```typescript
interface Movie {
  id: number;       // Unique identifier (1-20)
  title: string;    // Movie title
  image: string;    // Image filename (e.g., "1.jpg")
  genre: string;    // Genre category (lowercase)
  rating: string;   // Numerical rating as string
}
```

### 9.3 Complete Movie Dataset

| ID | Title | Genre | Rating | Image |
|----|-------|-------|--------|-------|
| 1 | Dark Storm | drama | 8.3 | 1.jpg |
| 2 | Whisper of Fate | fantasy | 7.7 | 2.jpg |
| 3 | Beyond the Edge | horror | 6.3 | 3.jpg |
| 4 | Lost in Shadows | action | 9.3 | 4.jpg |
| 5 | Echoes of Power | fantasy | 6.9 | 5.jpg |
| 6 | Grim Reckoning | drama | 8.4 | 6.jpg |
| 7 | Fury's Flight | action | 9.8 | 7.jpg |
| 8 | Path of the Forgotten | action | 7.2 | 8.jpg |
| 9 | Nightmare's Threshold | horror | 1.7 | 9.jpg |
| 10 | Eternal Hunt | fantasy | 7.5 | 10.jpg |
| 11 | Legacy of the Void | action | 8.5 | 11.jpg |
| 12 | Shadow's Crescent | horror | 7.5 | 12.jpg |
| 13 | Crimson Dawn | fantasy | 8.4 | 13.jpg |
| 14 | Silent Kingdom | fantasy | 6.5 | 14.jpg |
| 15 | Mystic Rite | fantasy | 9.8 | 15.jpg |
| 16 | Reign of the Lost | horror | 9.1 | 16.jpg |
| 17 | Timeless Myth | drama | 4.0 | 17.jpg |
| 18 | Oath of the Fallen | fantasy | 6.3 | 18.jpg |
| 19 | Veil of Night | drama | 9.5 | 19.jpg |
| 20 | Guardians of Twilight | horror | 7.4 | 20.jpg |

### 9.4 Genre Distribution

| Genre | Count | Movies |
|-------|-------|--------|
| Fantasy | 7 | 2, 5, 10, 13, 14, 15, 18 |
| Horror | 5 | 3, 9, 12, 16, 20 |
| Drama | 4 | 1, 6, 17, 19 |
| Action | 4 | 4, 7, 8, 11 |

### 9.5 Rating Distribution

| Category | Range | Count | Movies |
|----------|-------|-------|--------|
| Good | >= 8 | 9 | 1, 4, 6, 7, 11, 13, 15, 16, 19 |
| Ok | 5-7.99 | 10 | 2, 3, 5, 8, 10, 12, 14, 18, 20 |
| Bad | < 5 | 1 | 9, 17 |

---

## 10. Filtering & Search Logic

### 10.1 Search Implementation

**Input Component:**
```jsx
<input
  type="text"
  placeholder="Search movies..."
  className="search-input"
  value={searchTerm}
  onChange={handleSearchChange}
/>
```

**Filter Function:**
```javascript
const machesSearchTerm = (movie) => {
  return movie.title.toLowerCase().includes(searchTerm.toLowerCase());
};
```

**Characteristics:**
- Case-insensitive matching
- Substring search (partial matches work)
- Real-time filtering on each keystroke
- Empty search shows all movies

**Example Searches:**

| Search Term | Matches |
|-------------|---------|
| `""` | All 20 movies |
| `"dark"` | Dark Storm |
| `"the"` | Beyond the Edge, Path of the Forgotten, Oath of the Fallen, Guardians of Twilight |
| `"of"` | Whisper of Fate, Echoes of Power, Path of the Forgotten, Legacy of the Void, Reign of the Lost, Oath of the Fallen, Veil of Night, Guardians of Twilight |

### 10.2 Genre Filter Implementation

**Dropdown Component:**
```jsx
<select value={genre} onChange={handleGenreChange}>
  <option>All Genre</option>
  <option>Action</option>
  <option>Drama</option>
  <option>Fantasy</option>
  <option>Horror</option>
</select>
```

**Filter Function:**
```javascript
const matchesGenre = (genre, movie) => {
  return (
    genre === "All Genre" ||
    genre.toLowerCase() === movie.genre.toLowerCase()
  );
};
```

**Logic:**
- "All Genre" bypasses filter (returns true)
- Exact match required (after lowercase conversion)
- Options correspond to genres in dataset

### 10.3 Rating Filter Implementation

**Dropdown Component:**
```jsx
<select value={rating} onChange={handleRatingChange}>
  <option>All</option>
  <option>Good</option>
  <option>Ok</option>
  <option>Bad</option>
</select>
```

**Filter Function:**
```javascript
const matchesRating = (movie, rating) => {
  switch (rating) {
    case "Good":
      return movie.rating >= 8;
    case "Ok":
      return movie.rating >= 5 && movie.rating < 8;
    case "Bad":
      return movie.rating < 5;
    default:
      return true;
  }
};
```

**Rating Thresholds:**

```
Rating Scale:  0 -------- 5 -------- 8 -------- 10
               |    Bad   |    Ok    |   Good   |
               |  (< 5)   | (5-7.99) |  (>= 8)  |
```

### 10.4 Combined Filter Chain

```javascript
const filteredMovies = movies.filter(
  (movie) =>
    matchesGenre(genre, movie) &&
    machesSearchTerm(movie) &&
    matchesRating(movie, rating)
);
```

**Filter Execution Order:**
1. Genre check (fast string comparison)
2. Search term check (includes() operation)
3. Rating check (numeric comparison)

**Short-Circuit Evaluation:**
- If genre doesn't match, search and rating aren't checked
- Improves performance for large datasets

**Example Combined Filter:**

```
Search: "dark"
Genre: "Drama"
Rating: "Good"

Movie: Dark Storm
  ├── matchesGenre("Drama", movie)     → true (genre: "drama")
  ├── machesSearchTerm(movie)          → true (title contains "dark")
  └── matchesRating(movie, "Good")     → true (rating: 8.3 >= 8)

Result: INCLUDED in filteredMovies
```

---

## 11. Watchlist Functionality

### 11.1 Watchlist State Structure

```javascript
// Stores array of movie IDs (not full movie objects)
const [watchlist, setWatchlist] = useState([]);

// Example state:
watchlist = [3, 7, 15];  // IDs of watchlisted movies
```

**Why Store IDs Instead of Objects:**
1. Smaller memory footprint
2. Easy lookup with `includes()`
3. Simpler toggle logic
4. Movie data retrieved when needed

### 11.2 Toggle Implementation

```javascript
const toggleWatchlist = (movieId) => {
  setWatchlist((prev) => {
    if (prev.includes(movieId)) {
      // Remove from watchlist
      return prev.filter((id) => id !== movieId);
    }
    // Add to watchlist
    return [...prev, movieId];
  });
};
```

**Toggle Flow:**

```
toggleWatchlist(movieId=5)
         │
         ▼
┌─────────────────────────┐
│ Check: Is 5 in prev?    │
│ prev = [3, 7]           │
└───────────┬─────────────┘
            │
            NO (5 not in [3, 7])
            │
            ▼
    Return [...prev, 5]
    Result: [3, 7, 5]
```

```
toggleWatchlist(movieId=7)
         │
         ▼
┌─────────────────────────┐
│ Check: Is 7 in prev?    │
│ prev = [3, 7, 5]        │
└───────────┬─────────────┘
            │
           YES (7 in [3, 7, 5])
            │
            ▼
    Return prev.filter(id => id !== 7)
    Result: [3, 5]
```

### 11.3 Watchlist Indicator

**In MovieCard:**
```javascript
isWatchlisted={watchlist.includes(movie.id)}
```

**In Toggle UI:**
```jsx
<input
  type="checkbox"
  checked={isWatchlisted}
  onChange={() => toggleWatchlist(movie.id)}
/>
<span className="slider-label">
  {isWatchlisted ? "In Watchlist" : "Add to Watchlist"}
</span>
```

**Visual States:**

| State | Checkbox | Label | Slider Position | Background |
|-------|----------|-------|-----------------|------------|
| Not Watchlisted | Unchecked | "Add to Watchlist" | Left | Dark (#141414) |
| Watchlisted | Checked | "In Watchlist" | Right | Orange (#FFA100) |

### 11.4 Watchlist Page Rendering

```javascript
// In Watchlist.js
{watchlist.map((id) => {
  const movie = movies.find((movie) => movie.id === id);
  return (
    <MovieCard
      key={id}
      movie={movie}
      toggleWatchlist={toggleWatchlist}
      isWatchlisted={true}
    />
  );
})}
```

**Rendering Process:**

```
watchlist = [3, 7, 15]

For id=3:
  └── movies.find(m => m.id === 3)
      └── Returns "Beyond the Edge" movie object
      └── Renders MovieCard

For id=7:
  └── movies.find(m => m.id === 7)
      └── Returns "Fury's Flight" movie object
      └── Renders MovieCard

For id=15:
  └── movies.find(m => m.id === 15)
      └── Returns "Mystic Rite" movie object
      └── Renders MovieCard
```

---

## 12. Styling Architecture

### 12.1 CSS Files Overview

| File | Size | Purpose |
|------|------|---------|
| `src/styles.css` | ~4KB | Main application styles |
| `src/index.css` | ~366B | Global typography reset |
| `src/App.css` | ~564B | Legacy app styles (mostly unused) |

### 12.2 Color Scheme

**Theme Colors:**

| Usage | Color | Hex/RGB |
|-------|-------|---------|
| Page Background | Dark Gray | `#121212` |
| Card Background | Medium Gray | `#272727` |
| Primary Text | White | `#ffffff` |
| Secondary Text | Light Gray | `rgba(255,255,255,0.7)` |
| Accent/Active | Orange | `#FFA100` |
| Navigation BG | White | `#ffffff` |
| Navigation Text | Black | `#000000` |

**Rating Colors:**

| Rating | Class | Color |
|--------|-------|-------|
| Good (>=8) | `.rating-good` | `rgb(148, 255, 105)` (Green) |
| Ok (5-7.99) | `.rating-ok` | `rgb(255, 209, 123)` (Orange) |
| Bad (<5) | `.rating-bad` | `rgb(255, 123, 123)` (Red) |

### 12.3 Layout System

**CSS Grid (Movies Grid):**
```css
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  gap: 2rem;
  justify-content: center;
}
```

**Grid Behavior:**
- Auto-fills columns based on viewport width
- Fixed column width: 250px
- Gap between cards: 2rem (32px)
- Centered grid container

**Flexbox (Navigation):**
```css
.navigation {
  display: flex;
  justify-content: center;
  gap: 20px;
}
```

### 12.4 Component Styles

**Search Input:**
```css
.search-input {
  width: 100%;
  padding: 15px;
  margin: 25px 10px;
  border-radius: 100px;
  border: 1px solid #ccc;
}
```

**Filter Dropdowns:**
```css
.filter-bar {
  display: flex;
  justify-content: end;
}

.filter-dropdown {
  padding: 10px;
  border-radius: 5px;
  background-color: white;
}
```

**Movie Cards:**
```css
.movie-card {
  width: 250px;
  background-color: #272727;
  border-radius: 8px;
  box-shadow: 0 10px 10px 0 rgba(0,0,0,.5);
  transition: transform 0.15s ease-in-out;
}

.movie-card:hover {
  transform: scale(1.03);
}
```

**Custom Toggle Switch:**
```css
.switch {
  position: relative;
  display: inline-block;
  width: 150px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #141414;
  transition: 0.4s;
  border-radius: 100px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #FFA100;
}

input:checked + .slider:before {
  transform: translateX(125px);
}
```

### 12.5 Typography

**Font Stack:**
```css
body {
  font-family: "Roboto", sans-serif;
  margin: 0;
}
```

**Font Sizes:**

| Element | Size |
|---------|------|
| Movie Title | 1.1rem |
| Genre/Rating | 0.9rem |
| Body Text | Default (16px) |
| Header Subtitle | Default |

### 12.6 Responsive Design

The application uses CSS Grid's auto-fill feature for responsive behavior:

```
Viewport: 1200px+
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ Movie1 │ │ Movie2 │ │ Movie3 │ │ Movie4 │
└────────┘ └────────┘ └────────┘ └────────┘

Viewport: 800px
┌────────┐ ┌────────┐ ┌────────┐
│ Movie1 │ │ Movie2 │ │ Movie3 │
└────────┘ └────────┘ └────────┘

Viewport: 500px
┌────────┐ ┌────────┐
│ Movie1 │ │ Movie2 │
└────────┘ └────────┘
```

No media queries needed - grid handles breakpoints automatically.

---

## 13. Configuration Files

### 13.1 public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/fav.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Web site created using create-react-app" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
    <title>Muvi Dux</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

**Key Elements:**

| Element | Purpose |
|---------|---------|
| `<div id="root">` | React mounting point |
| `%PUBLIC_URL%` | Replaced with public folder path at build |
| `theme-color` | Browser toolbar color (mobile) |
| `viewport` | Responsive scaling configuration |

### 13.2 public/manifest.json

```json
{
  "short_name": "React App",
  "name": "Create React App Sample",
  "icons": [
    {
      "src": "fav.png",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

**PWA Configuration:**

| Property | Value | Purpose |
|----------|-------|---------|
| `short_name` | "React App" | Displayed under app icon |
| `display` | "standalone" | Full-screen app mode |
| `theme_color` | "#000000" | Status bar color |
| `background_color` | "#ffffff" | Splash screen background |

### 13.3 src/index.js

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
```

**Initialization Sequence:**

1. Import React and ReactDOM
2. Import global styles (`index.css`)
3. Import root App component
4. Get DOM element with id "root"
5. Create React root using concurrent mode API
6. Render App wrapped in StrictMode
7. Initialize Web Vitals reporting

### 13.4 src/reportWebVitals.js

```javascript
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
```

**Core Web Vitals Tracked:**

| Metric | Full Name | Measures |
|--------|-----------|----------|
| CLS | Cumulative Layout Shift | Visual stability |
| FID | First Input Delay | Interactivity |
| FCP | First Contentful Paint | Loading performance |
| LCP | Largest Contentful Paint | Loading performance |
| TTFB | Time to First Byte | Server response time |

### 13.5 .gitignore

```
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

---

## 14. Component Interaction Flow

### 14.1 Application Lifecycle

```
Browser loads index.html
         │
         ▼
JavaScript bundle loads
         │
         ▼
ReactDOM.createRoot(#root)
         │
         ▼
<App /> renders
         │
         ├── <Header /> renders (static)
         ├── <BrowserRouter> initializes
         │         │
         │         ├── Navigation renders
         │         └── Routes evaluates path
         │                    │
         │         ┌─────────┴─────────┐
         │         │                   │
         │     path="/"         path="/watchlist"
         │         │                   │
         │         ▼                   ▼
         │   <MoviesGrid />      <Watchlist />
         │
         └── <Footer /> renders (static)

         │
         ▼
useEffect runs (movies fetch)
         │
         ▼
setMovies(data) triggers re-render
         │
         ▼
MoviesGrid receives populated movies
         │
         ▼
MovieCards render in grid
```

### 14.2 Search Flow

```
User types "dark" in search input
              │
              ▼
onChange fires → handleSearchChange(e)
              │
              ▼
setSearchTerm("dark")
              │
              ▼
MoviesGrid re-renders
              │
              ▼
filteredMovies recomputed:
  movies.filter(m =>
    matchesGenre(genre, m) &&
    machesSearchTerm(m) &&        ← "dark" matches "Dark Storm"
    matchesRating(m, rating)
  )
              │
              ▼
Only matching MovieCards render
```

### 14.3 Watchlist Toggle Flow

```
User clicks toggle on Movie ID=5
              │
              ▼
onChange fires → toggleWatchlist(5)
              │
              ▼
setWatchlist called with functional update
              │
              ▼
┌─────────────────────────────┐
│ prev.includes(5)?           │
│   No → return [...prev, 5]  │
│   Yes → return filtered     │
└─────────────────────────────┘
              │
              ▼
App state updates: watchlist = [..., 5]
              │
              ▼
Props cascade down:
  - MoviesGrid receives new watchlist
  - MovieCard for ID=5 receives isWatchlisted=true
              │
              ▼
Toggle UI updates:
  - Checkbox becomes checked
  - Label changes to "In Watchlist"
  - Slider animates to right
  - Background turns orange
```

### 14.4 Navigation Flow

```
User clicks "Watchlist" link
              │
              ▼
React Router intercepts click
(prevents full page reload)
              │
              ▼
History API updates URL to /watchlist
              │
              ▼
Routes re-evaluates:
  path="/watchlist" matches
              │
              ▼
<Watchlist /> component renders
              │
              ▼
Maps watchlist IDs to MovieCards
              │
              ▼
User sees only watchlisted movies
```

---

## 15. Git Development History

### 15.1 Commit Timeline

| Commit | Hash | Description |
|--------|------|-------------|
| 1 | `bf1e0cc` | Initialize project using Create React App |
| 2 | `0a7e91f` | Update assets file |
| 3 | `4b57e70` | Implemented hooks (effect and state) |
| 4 | `11b0a2b` | Added movies grid with movies |
| 5 | `66c0aa7` | Added image error handler |
| 6 | `10db43e` | Added colorful rating |
| 7 | `e4c7fb9` | Added search bar |
| 8 | `9bff94e` | Added searching functionality |
| 9 | `5f955c7` | Added genre and rating based filter options |
| 10 | `84ce553` | Added genre and rating state change |
| 11 | `421408a` | Filter by genre logic implementation |
| 12 | `62d7ad5` | Added rating based filtering |
| 13 | `a4ec41d` | Added react-router-dom package |
| 14 | `2dacbb5` | Configured React Router |
| 15 | `103fbcc` | Moved the movies state to App.js parent file |
| 16 | `e60072c` | Added watchlist toggle functionality |
| 17 | `9444638` | Add/remove from watchlist functionality added |

### 15.2 Development Phases

**Phase 1: Project Setup (Commits 1-2)**
- Created React app with CRA
- Added initial assets

**Phase 2: Core Display (Commits 3-6)**
- Implemented React hooks
- Built movie grid layout
- Added image error handling
- Implemented color-coded ratings

**Phase 3: Search & Filter (Commits 7-12)**
- Added search bar UI
- Implemented search logic
- Added filter dropdowns
- Implemented genre filtering
- Implemented rating filtering

**Phase 4: Routing (Commits 13-15)**
- Installed react-router-dom
- Configured routes
- Lifted state to App.js (architectural improvement)

**Phase 5: Watchlist (Commits 16-17)**
- Added toggle functionality
- Completed add/remove from watchlist

### 15.3 Current Git Status

```
Branch: master
Status:
  D public/favicon.ico     (deleted)
  D public/logo192.png     (deleted)
  D public/logo512.png     (deleted)
  M src/styles.css         (modified)
```

---

## 16. Technical Considerations

### 16.1 Code Quality Observations

**Strengths:**
- Well-structured component hierarchy
- Clear separation of concerns
- Proper use of React hooks
- Immutable state updates
- Controlled component pattern for forms
- Image error handling for graceful degradation

**Areas for Improvement:**
- Typo in function name: `machesSearchTerm` (should be `matchesSearchTerm`)
- No PropTypes or TypeScript for type safety
- No loading/error states for data fetch
- Magic strings could be extracted to constants
- Missing unit tests

### 16.2 Performance Considerations

**Current Implementation:**
- Re-renders entire grid on filter changes
- Linear search for movie lookup by ID
- No memoization of expensive computations

**Potential Optimizations:**
```javascript
// Memoize filtered movies
const filteredMovies = useMemo(() =>
  movies.filter(...),
  [movies, searchTerm, genre, rating]
);

// Memoize toggle callback
const toggleWatchlist = useCallback((movieId) => {
  setWatchlist(prev => ...);
}, []);

// Convert movies to Map for O(1) lookup
const moviesMap = useMemo(() =>
  new Map(movies.map(m => [m.id, m])),
  [movies]
);
```

### 16.3 Accessibility Considerations

**Current Implementation:**
- Basic semantic HTML structure
- Alt text on images
- Form inputs with standard behavior

**Potential Improvements:**
- Add ARIA labels to custom toggle
- Ensure keyboard navigation works
- Add focus indicators
- Screen reader announcements for filter results

### 16.4 Security Considerations

**Current Implementation:**
- Static data only (no user input to backend)
- No authentication/authorization
- No sensitive data handling

**If Expanding:**
- Validate/sanitize any user input
- Implement CSRF protection if adding forms
- Use HTTPS in production
- Avoid XSS via React's built-in escaping

### 16.5 Scalability Considerations

**Current State:**
- 20 movies (manageable)
- Client-side filtering (fine for small datasets)

**For Larger Datasets:**
- Implement pagination or infinite scroll
- Move filtering to backend API
- Add data caching strategy
- Consider virtualized list rendering

---

## Appendix A: File Quick Reference

| File | Type | Key Exports | Dependencies |
|------|------|-------------|--------------|
| `App.js` | Component | `App` (default) | React, Router, Header, MoviesGrid, Footer, Watchlist |
| `Header.js` | Component | `Header` (default) | React |
| `Footer.js` | Component | `Footer` (default) | React |
| `MoviesGrid.js` | Component | `MoviesGrid` (default) | React, MovieCard |
| `MovieCard.js` | Component | `MovieCard` (default) | React |
| `Watchlist.js` | Component | `Watchlist` (default) | React, MovieCard |
| `index.js` | Entry | None | React, ReactDOM, App |
| `styles.css` | Styles | None | None |
| `movies.json` | Data | JSON Array | None |

---

## Appendix B: Available Genres & Ratings

### Genres
- Action
- Drama
- Fantasy
- Horror

### Rating Classifications
- **Good:** Rating >= 8.0
- **Ok:** Rating 5.0 - 7.99
- **Bad:** Rating < 5.0

---

*This documentation was generated for MovieServo v0.1.0*
