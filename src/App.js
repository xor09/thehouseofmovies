import "./App.css";
import React from "react";
import "./style.css";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import {Home} from './Home.js';
import {Movies} from './Movies.js';
import {TvShows} from './TvShows.js';
import {Error} from './Error.js';
import { Information} from './Information';
import { InformationTV} from './InformationTV';

import {Route, Switch} from 'react-router-dom';

const API_KEY = "api_key=96421fbbc5840b04b22117d3eed01980";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_API = "https://image.tmdb.org/t/p/w500";

function App() {

  return (
    <>
      {/* ----------- header------------------- */}
     
        <Header />
    
      {/* ---------------------------- */}
        
        <Switch>
              
              <Route exact path='/' component={Home}/>
              <Route path='/movie' component={Movies}/>
              <Route path='/tv' component={TvShows}/>
              <Route path='/info/movie/:id/:title' component={(props) => <Information key={window.location.href}/>}/>
              <Route path='/info/tv/:id/:name' component={(props) => <InformationTV key={window.location.href}/>}/>
              <Route component={Error}/>
              
        </Switch>
        
        
      {/* ------------- Footer ------------- */}

          <Footer />
  
      {/* ---------------------------------- */}
    </>
  );
}

export default App;
