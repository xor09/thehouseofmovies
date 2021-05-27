import React, {useState} from "react";
import { Button, Badge, Modal, Carousel  } from "react-bootstrap";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";


const IMAGE_API = "https://image.tmdb.org/t/p/w500";
const API_KEY = "api_key=96421fbbc5840b04b22117d3eed01980";
const BASE_URL = "https://api.themoviedb.org/3";

let _URL = [];
let _NAME = '';

export function MovieData({ title, poster_path, overview, vote_average, id }) {

  
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

  return (
    <div className="item">
      <div className='badge-info' style={{backgroundColor: 'black'}}>
          <div className='badge-left'><Badge variant="info"  style={{backgroundColor: 'black'}}> {vote_average.toPrecision(2)} &#11088;</Badge></div>
          <div className='info-right'><Badge variant="info"  style={{backgroundColor: 'black'}}><Link to={'/info/movie/'+id+'/'+title} para style={{color: 'white', textDecoration: 'none'}}>More</Link></Badge></div>
      </div>
      <Link to={'/info/movie/'+id+'/'+title}><img src={IMAGE_API + poster_path} alt={title} class="image"></img></Link>

      <div class="outerDiv">
        <div class="CentralDiv">{title}</div>
      </div>

      <div class="overlay">
        <Button
          variant="outline-danger"
          style={{ float: "right", borderRadius: "15px" }}
          onClick={() => {
            setter(id);
          }}
        >
          Watch Trailer
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
  );
}
