import {TVData} from './TvCard.js'
import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import {Carousel} from 'react-bootstrap';

const API_KEY = "api_key=96421fbbc5840b04b22117d3eed01980";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_API = "https://image.tmdb.org/t/p/w500";
const IMAGE_API_ORG = "https://image.tmdb.org/t/p/original";

export function TvShows(){

    // const [Upcoming, setUpcoming] = useState([]);
    // useEffect(async () => {
    //     const { data } = await axios.get(
    //         BASE_URL +
    //         "/tv/latest?"+API_KEY+"&language=en-US&page=1"
    //     );
    //     setUpcoming(data);
    //   }, []);

    const [Latesti, setLatesti] = useState([]);
    useEffect(async () => {
        const { data } = await axios.get(
          BASE_URL +
            "/tv/airing_today?"+API_KEY+"&language=en-US&page=1"
        );
        setLatesti(data.results);
      }, []);

    const [Nowplaying, setNowplaying] = useState([]);
    useEffect(async () => {
        const { data } = await axios.get(
          BASE_URL +
            "/tv/on_the_air?"+API_KEY+"&language=en-US&page=1"
        );
        setNowplaying(data.results);
      }, []);


    const [Popular, setPopular] = useState([]);
    useEffect(async () => {
        const { data } = await axios.get(
          BASE_URL +
            "/tv/popular?"+API_KEY+"&language=en-US&page=1"
        );
        setPopular(data.results);
      }, []);

    const [Toprated, setToprated] = useState([]);
    useEffect(async () => {
        const { data } = await axios.get(
          BASE_URL +
            "/tv/top_rated?"+API_KEY+"&language=en-US&page=1"
        );
        setToprated(data.results);
      }, []);



    return(
    <>
        {/* <div class="filter" style={{fontSize: '3vw'}}>Latest</div>
        <div class="movies-carousel">
                <Carousel  style={{ maxWidth: '100%', backgroundColor: 'black', display: 'flex' , justifyContent: 'center', alignItems: 'center'}}>
                        {
                        Upcoming.length>0 && Upcoming.map(value=>{
                        return <Carousel.Item interval={1000} style={{}}>
                                    <img
                                            className="d-block w-100"
                                            src={IMAGE_API_ORG + value.backdrop_path} alt={value.name}
                                            alt={value.name}
                                        />
                                        <Carousel.Caption>
                                           
                                                <h4 style={{fontSize: '6vw'}}>{value.name}</h4>
                                                <p style={{fontSize: '2vw'}}>{value.overview}</p>
                                            
                                        </Carousel.Caption>
                                </Carousel.Item>
                        })
                        }
                </Carousel>
        </div> */}


        <br></br>
           <div class="filter">Airing Today</div>
            <div className="App">
                {Latesti.length > 0 &&
                 Latesti.map((value) => {
                    return <TVData key={value.id} {...value} />;
                })}
            </div>

        <br></br>
            <div class="filter">On the Air</div>
            <div className="App">
                {Nowplaying.length > 0 &&
                 Nowplaying.map((value) => {
                    return <TVData key={value.id} {...value} />;
                })}
            </div>
            
        <br></br>
            <div class="filter">Popular Shows</div>
            <div className="App">
                {Popular.length > 0 &&
                 Popular.map((value) => {
                    return <TVData key={value.id} {...value} />;
                })}
            </div>
        <br></br>
        <div class="filter">Top Rated Shows</div>
            <div className="App">
                {Toprated.length > 0 &&
                 Toprated.map((value) => {
                    return <TVData key={value.id} {...value} />;
                })}
            </div>
        <br></br>
    </>
    )
}