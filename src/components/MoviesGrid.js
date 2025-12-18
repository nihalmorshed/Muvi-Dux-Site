import React, {useState, useEffect} from "react";
import '../styles.css'

export default function MoviesGrid(){
    const [movies, setMovies] = useState([]);
    
    useEffect(()=>{
        fetch("movies.json").then(response => response.json()).then(data => setMovies(data))

    }, []);
    return(
        <div className="movies-grid">
        
        </div>

    );
}