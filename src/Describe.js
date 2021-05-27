import React,{useState} from "react";
import { MovieData } from "./Cards.js";
import {TVData} from './TvCard.js';

const API_KEY = "api_key=96421fbbc5840b04b22117d3eed01980";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_API = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL_MOVIE = BASE_URL+'/search/movie?'+API_KEY+'&query=';
const SEARCH_URL_TV = BASE_URL+'/search/tv?'+API_KEY+'&query=';


export function Describe(){

    const [movies, setMovies] = useState([]);
    const [tv, settv] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    
    function handleOnSubmit(e){
        e.preventDefault();
         
        if(searchTerm){
            fetch(SEARCH_URL_MOVIE+searchTerm).then((res) => res.json()).then((data) => {
                setMovies(data.results);
            });
            fetch(SEARCH_URL_TV+searchTerm).then((res) => res.json()).then((data) => {
                settv(data.results);
            });
        }
    }

    function handleOnChange(e){
        setSearchTerm(e.target.value);
    }

    return(
        <>
            <div class='info' style={{padding: '5%'}} > 
                <p style={{fontSize: '3em', color: 'white'}}>Welcome.</p>
                <p style={{fontSize: '1.5em', color: 'white'}}>Millions of movies, TV shows and people to discover. Explore now.</p>
                <br></br>
                <div class="container h-100">
                <div class="d-flex justify-content-center h-100">
                    <div class="searchbar">
                    <form onSubmit={handleOnSubmit}>
                        <input class="search_input" type="text" name="" placeholder="Search..." value={searchTerm} onChange={handleOnChange}/>
                        <a class="search_icon" onClick={handleOnSubmit}><i class="fas fa-search"></i></a>
                    </form>
                    </div>
                </div>
                </div>
            </div>
            <br></br>
            <br></br>
            {/* <div class="filter">Your Search</div> */}
            <div className="App">
                {tv.length > 0 &&
                    tv.map((value) => {
                        return <TVData key={value.id} {...value} />
                })}
                {movies.length > 0 &&
                movies.map((value) => {
                    return <MovieData key={value.id} {...value} />
                })}
                
            </div>
            <br></br>

        </>
    )
}