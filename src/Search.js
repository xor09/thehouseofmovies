import React from 'react'

const API_KEY = "api_key=96421fbbc5840b04b22117d3eed01980";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_API = "https://image.tmdb.org/t/p/w500";
const SEARCH_URL = BASE_URL+'/search/movie?'+API_KEY+'&query=';


export function Search(){

    return(
        <>
            <div>Search Page</div>
        </>
    )
}
