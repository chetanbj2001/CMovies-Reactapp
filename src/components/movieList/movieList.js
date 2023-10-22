import React, { useEffect, useState } from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"

const MovieList = () => {

    const [movieList, setMovieList] = useState([])
    const [originalMovieList, setOriginalMovieList] = useState([]); // Store the original movie list
    const { type } = useParams()

    useEffect(() => {
        const getData = () => {
            fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
                .then(res => res.json())
                .then(data => {
                    setOriginalMovieList(data.results);
                    setMovieList(data.results);
                });
        }

        getData()
    }, [type])

    // useEffect(() => {
    //     getData()
    // }, [type])


    const searchmovie = (e) => {

        const searchTerm = e.target.value;
        if (searchTerm === "") {
            setMovieList(originalMovieList);
        }
        else {
            const filteredMovies = movieList.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));
            setMovieList(filteredMovies);
            console.log(filteredMovies);
        }
        console.log(movieList);
    }



    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="search-block">
                <h1 className="search-block-title">Search</h1>
                <input className="search-block-input" name="search" type="text" placeholder="search here" onChange={searchmovie} />
            </div>
            <br />
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                        
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList