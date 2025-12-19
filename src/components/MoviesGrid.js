import React, {useState, useEffect} from "react";
import '../styles.css'
import MovieCard from "./MovieCard";

export default function MoviesGrid(){
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        fetch("movies.json").then(resp => resp.json()).then(data => setMovies(data));

    },[]);

    return(
        <div className="movies-grid">
            {
                movies.map(
                    movie => (
                        <MovieCard movie={movie}></MovieCard>
                            
                        
                    )
                )
            }
        </div>
    );
}