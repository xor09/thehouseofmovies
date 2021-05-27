import React, { useState, useEffect, useCallback, useRef } from "react";
import "./style.css";
import axios from "axios";
import { MovieData } from "./Cards.js";
import {TvData} from './TvCard.js';
import {Link, useParams} from 'react-router-dom';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Button, Badge, Modal, Carousel  } from "react-bootstrap";
import ReactPlayer from "react-player";
import 'react-circular-progressbar/dist/styles.css';


const IMAGE_API = "https://image.tmdb.org/t/p/w500";
const API_KEY = "api_key=96421fbbc5840b04b22117d3eed01980";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_API2 = "https://image.tmdb.org/t/p/original";


let _URL = [];
let _NAME = '';

export function Information(){
    const {id, title} = useParams();

    const [Moviedetail, setMoviedetail] = useState([]);
    const [BackImage, setBackImage]= useState('');
    const [FrontImage, setFrontImage]= useState('');
    const [Overview, setOverview]= useState('');
    const [Tagline, setTagline]= useState('');
    const [VoteAVG, setVoteAVG] = useState(0.0);
    const [ReleaseDate, setReleaseDate] = useState('');
    const [Status, setStatus] = useState('');
    const [Cast, setCast] = useState([]);
    const [Crew, setCrew] = useState([]);
    const [Rec, setRec] = useState([]);
    const [Genres, setGenres] = useState([]);

    

    useEffect(async () => {
        console.log("update");
        const { data } = await axios.get(
          BASE_URL +
            "/movie/"+id+"?api_key=96421fbbc5840b04b22117d3eed01980&language=en-US"
        );
        setMoviedetail(data.production_companies);
        setBackImage(data.backdrop_path);
        setFrontImage(data.poster_path);
        setOverview(data.overview);
        setTagline(data.tagline);
        setVoteAVG(data.vote_average);
        setReleaseDate(data.release_date);
        setStatus(data.status);
        setGenres(data.genres);
      }, []);

      useEffect(async () => {
        console.log("updated");
        const { data } = await axios.get(
          BASE_URL +
            "/movie/"+id+"/credits?api_key=96421fbbc5840b04b22117d3eed01980&language=en-US"
        );
            setCast(data.cast);
            setCrew(data.crew);
      }, []);

      useEffect(async () => {
        const { data } = await axios.get(
          BASE_URL +
            "/movie/"+id+"/recommendations?api_key=96421fbbc5840b04b22117d3eed01980&language=en-US"
        );
            setRec(data.results);
      }, []);



      /*  -------------------------------  */
            const [show, setShow] = useState(false);

            const overlayContent = document.getElementById("_contents");
            function setter(id) {
                _URL.splice(0, _URL.length);
                fetch(BASE_URL + "/movie/" + id + "/videos?" + API_KEY)
                .then((res) => res.json())
                .then((videoData) => {
                    if (videoData) {
                    if (videoData.results.length > 0) {
                        videoData.results.forEach((video) => {
                        let { key, name, site } = video;
                        if (site === "YouTube") {
                            let URL = "https://www.youtube.com/embed/" + key;
                            _URL.push(URL);
                            _NAME = name;
                        }

                        if (site === "Vimeo") {
                            let URL = "https://vimeo.com/" + key;
                            _URL.push(URL);
                            _NAME = name;
                        }

                        });
                        setShow(true);
                    } else {
                        
                    }
                    }
                });
                
            }

     

    return(
        <>
        {/* <img src={"https://image.tmdb.org/t/p/original"+BackImage}></img> */}
        {/* <img src={"https://image.tmdb.org/t/p/w500"+FrontImage}></img> */}
            <div class='top-info'>
                
                <div class='box' style={{ backgroundImage: `url('https://image.tmdb.org/t/p/original${BackImage}')`, backgroundSize: '110% 100%', backgroundRepeat: 'no-repeat'}}>
                    <div class='overlay1'>
                        <div class='overlay1-div1'>
                            <img src={"https://image.tmdb.org/t/p/w500"+FrontImage}></img>
                        </div>
                        
                        <div class='overlay1-div2'>
                            <div style={{display: "flex", justifyContent: 'flex-start', alignItems:'flex-start', flexDirection: 'column'}}>
                                <h2>{title} &emsp; &ensp;</h2>
                                <div style={{color: 'white', opacity: '0.6'}}>{Tagline}</div>
                                <br></br>
                                <div style={{wordSpacing: '3px'}}> { `( ${ReleaseDate} )`}  &ensp; {`|`} &ensp;{`${Status}`} &ensp; {`|`} &ensp; {
                                    Genres.length>0 && Genres.map(g =>{
                                        return g.name+", "
                                    })
                                }</div>
                            </div>
                            <br></br>
                            <div style={{display: "flex", justifyContent: 'center', alignItems:'center', marginTop: '5px'}}>
                                <Link></Link>
                                
                                <div style={{ width: '100px', height: '100px', margin: '0px 7px 0px 7px' }}>
                                    <CircularProgressbar value={VoteAVG*10} text={`${VoteAVG*10}%`} background={true} styles={buildStyles({pathTransitionDuration: 1, pathColor: `rgba(0, 177, 0, 0.9)`, textColor: '#00b100', trailColor: '#000000',backgroundColor: '#080000'})}/>
                                </div>
                                <div style={{margin: '0px 7px 0px 7px'}}><strong>User<br/> Score</strong></div>
                                <div class='divider' >|</div>
                                <div style={{margin: '0px 7px 0px 7px'}} >
                                    <Button
                                        variant="outline-success"
                                        style={{ float: "right", borderRadius: "15px"}}
                                        onClick={() => {
                                            setter(id);
                                        }}
                                        >
                                       <i class="fas fa-play"></i> &nbsp; Play Trailer
                                    </Button>
                                    <Modal
                                        show={show}
                                        onHide={() => setShow(false)}
                                        size="lg"
                                        dialogClassName="modal-90w"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                        >
                                        <Modal.Header closeButton>
                                            <Modal.Title>{title}</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body id="_contents">
                                            {
                                            <Carousel interval='100000000'  style={{padding: '5% 15% 5% 15%', backgroundColor: 'black'}}>
                                                {
                                                _URL.length>0 && _URL.map(loc=>{
                                                return <Carousel.Item>
                                                            <ReactPlayer width="100%" controls url={loc}></ReactPlayer>
                                                        </Carousel.Item>
                                                })
                                                }
                                            </Carousel>
                                            }
                                        
                                        </Modal.Body>
                                    </Modal>
                                </div>
    
                            </div>
                            
                            <br></br>
                            <h4>Overview</h4><p style={{fontFamily: 'sans-serif',fontWeight: 'lighter'}}>{Overview}</p>
                        </div>
                    </div>
                    
                </div>
                        <div class='midle-info'>
                </div>
                
            </div>
            <div class='cast-title'><b>Top Billed Cast</b></div>
            <div class='cast'>
                
                {
                    Cast.length > 0 && Cast.map(value=>{
                        
                        return <div class='cast-info'>
                                    <div class='cast-pic'>
                                        <img src={IMAGE_API + value.profile_path} alt={""}></img>
                                    </div>

                                    <div class='cast-name'>
                                        <div class='cast-name-real'>{value.original_name}</div>
                                        <div class='cast-name-character'>{value.character}</div>
                                    </div>  
                                </div>
                    })
                }
                
            </div> 

            <div class='crew-title'><b>Crew</b></div>
            <div class='crew'>
                
                {
                    Crew.length > 0 && Crew.map(value=>{
                        
                        return <div class='crew-info'>
                                    <div class='crew-pic'>
                                        <img src={IMAGE_API + value.profile_path} alt={""}></img>
                                    </div>

                                    <div class='crew-name'>
                                        <div class='crew-name-original'>{value.original_name}</div>
                                        <div class='crew-job'>{value.job}</div>
                                    </div>  
                                </div>
                    })
                }
                
            </div> 
           {/* <div>
               <h10>Budget</h10>
           </div> */}
            <br></br>
            <div class="filter">Recommendations</div>
            <br></br>
            <div className="App">
                {Rec.length > 0 &&
                Rec.map((value) => {
                    return <MovieData key={value.id} {...value} />;
                })}
            </div>
             
        </>
    )
}


