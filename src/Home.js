import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import {Describe} from './Describe.js'
import {TVData} from './TvCard.js';
import { MovieData } from "./Cards.js";



const API_KEY = "api_key=96421fbbc5840b04b22117d3eed01980";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_API = "https://image.tmdb.org/t/p/w500";


export function Home(){
    const [Data, setData] = useState([]);
    const [Km, setKm] = useState([]);
    const [TrTV, setTrTv] = useState([]);
    const [PoTV, setPoTv] = useState([]);
    
  
    useEffect(async () => {
      const { data } = await axios.get(
        BASE_URL +
          "/trending/movie/day?api_key=96421fbbc5840b04b22117d3eed01980&language=en-US&page=1"
      );
      setData(data.results);
    }, []);
  
  
    useEffect(async () => {
      const { data } = await axios.get(
        BASE_URL +
          "/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&" +
          API_KEY
      );
      setKm(data.results);
    }, []);
    
  
    useEffect(async () => {
      const { data } = await axios.get(
        BASE_URL +
          "/tv/top_rated?" +
          API_KEY+'&language=en-US'
      );
      setTrTv(data.results);
    }, []);

    useEffect(async () => {
      const { data } = await axios.get(
        BASE_URL +
          "/tv/popular?" +
          API_KEY+'&language=en-US'
      );
      setPoTv(data.results);
    }, []);


    return(
        <>
          {/* --------------- describe ----------------- */}
            <Describe/>

            <div class="filter">Trending Movies</div>
            <div className="App">
                {Data.length > 0 &&
                Data.map((value) => {
                    return <MovieData key={value.id} {...value} />;
                })}
            </div>
            
            
            <div class="filter">Popular Movies</div>
            <div className="App">
                {Km.length > 0 &&
                Km.map((value) => {
                    return <MovieData key={value.id} {...value} />;
                })}
            </div>

            <div class="filter">Top Rated Tv Shows</div>
            <div className="App">
                {TrTV.length > 0 &&
                TrTV.map((value) => {
                    return <TVData key={value.id} {...value} />;
                })}
            </div>

            <div class="filter">Popular Tv Shows</div>
            <div className="App">
                {PoTV.length > 0 &&
                PoTV.map((value) => {
                    return <TVData key={value.id} {...value} />;
                })}
            </div>
            
        </>
    )
}