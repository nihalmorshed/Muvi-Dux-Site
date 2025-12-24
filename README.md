# MovieServo

A modern React-based movie discovery and watchlist management application featuring a sleek dark theme interface.

![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![React Router](https://img.shields.io/badge/React_Router-7.11.0-CA4245?logo=react-router)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

MovieServo (also known as "Muvi Dux") is a single-page application that allows users to browse a curated catalog of movies, search and filter by various criteria, and maintain a personal watchlist. Built with React 19 and React Router, it demonstrates modern frontend development practices with a Netflix-inspired dark theme aesthetic.

## Features

- **Movie Catalog** - Browse 20 curated movies with posters, titles, genres, and ratings
- **Real-time Search** - Case-insensitive search across all movie titles
- **Genre Filtering** - Filter movies by Action, Drama, Fantasy, or Horror
- **Rating Classification** - Filter by Good (8+), Ok (5-7.9), or Bad (<5) ratings
- **Watchlist Management** - Add/remove movies with intuitive toggle switches
- **Dedicated Watchlist Page** - View and manage your saved movies
- **Responsive Design** - Auto-adjusting grid layout for all screen sizes
- **Client-side Routing** - Seamless navigation without page reloads

## Demo

The application features:
- A dark-themed movie grid with hover effects
- Color-coded ratings (green for good, orange for ok, red for bad)
- Custom toggle switches for watchlist management
- Responsive card-based layout

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.2.3 | UI library |
| React DOM | 19.2.3 | Web rendering |
| React Router DOM | 7.11.0 | Client-side routing |
| Create React App | 5.0.1 | Build tooling |
| Web Vitals | 2.1.4 | Performance monitoring |

## Project Structure

```
movieservo/
├── public/
│   ├── images/              # Movie poster images (1.jpg - 20.jpg)
│   ├── movies.json          # Movie data source
│   ├── logo.png             # Application logo
│   ├── fav.png              # Browser favicon
│   └── index.html           # HTML entry point
│
├── src/
│   ├── components/
│   │   ├── Header.js        # Logo and subtitle display
│   │   ├── Footer.js        # Copyright footer
│   │   ├── MoviesGrid.js    # Main grid with search/filter controls
│   │   ├── MovieCard.js     # Individual movie card component
│   │   └── Watchlist.js     # Dedicated watchlist page
│   │
│   ├── App.js               # Root component with state management
│   ├── styles.css           # Main stylesheet
│   ├── index.css            # Global typography
│   └── index.js             # React DOM entry point
│
└── package.json             # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movieservo.git
   cd movieservo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm test` | Launches the test runner |
| `npm run build` | Builds the app for production |
| `npm run eject` | Ejects from Create React App (one-way operation) |

## Architecture

### State Management

The application uses React's built-in state management with the "lifting state up" pattern:

- **App.js** manages global state:
  - `movies` - Array of all movie objects fetched from JSON
  - `watchlist` - Array of movie IDs added to the watchlist

- **MoviesGrid.js** manages local filter state:
  - `searchTerm` - Current search input
  - `genre` - Selected genre filter
  - `rating` - Selected rating filter

### Component Hierarchy

```
App.js (Global State)
├── Header
├── BrowserRouter
│   ├── Navigation
│   └── Routes
│       ├── "/" → MoviesGrid
│       │   └── MovieCard (for each movie)
│       └── "/watchlist" → Watchlist
│           └── MovieCard (for each watchlisted movie)
└── Footer
```

### Data Structure

Movies are stored in `public/movies.json` with the following schema:

```javascript
{
  "id": 1,
  "title": "Movie Title",
  "image": "1.jpg",
  "genre": "action",
  "rating": "8.5"
}
```

## Styling

The application features a Netflix-inspired dark theme:

| Element | Color |
|---------|-------|
| Background | `#121212` |
| Cards | `#272727` |
| Text | `#ffffff` |
| Accent | `#FFA100` |
| Good Rating | Green |
| Ok Rating | Orange |
| Bad Rating | Red |

### Design Features

- CSS Grid for responsive movie layout
- Hover scale effects on movie cards
- Custom-styled toggle switches
- Smooth transitions and animations
- Rounded corners throughout

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | MoviesGrid | Home page with full movie catalog |
| `/watchlist` | Watchlist | Shows only watchlisted movies |

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- Add movie details page with full descriptions
- Implement persistent watchlist storage (localStorage/backend)
- Add user authentication
- Integrate with external movie API (TMDB, OMDB)
- Add movie trailer previews
- Implement sorting options (by title, rating, genre)
- Add dark/light theme toggle
- Improve accessibility with ARIA labels

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Movie poster images and data are for demonstration purposes
- Inspired by Netflix's dark theme design
- Built with [Create React App](https://create-react-app.dev/)
