import React from "react";
import { ReactComponent as Logo } from "./images/default-monochrome-white.svg";
import {Link} from 'react-router-dom';


function Show() {
  var navList = document.getElementById("nav-lists");
  navList.classList.add("_Menus-show");
}

function Hide(){
  var navList = document.getElementById("nav-lists");
  navList.style.top='0';
  navList.style.zIndex='1';
  navList.classList.remove("_Menus-show");
}



export function Header() {
  return (
    <div>
        <div class="container-header">
            <div class="logo">
                <Link to='/'><Logo/></Link>
            </div>

            <div class="navbar">

                <div class="icon-bar" onClick={Show}>
                    <i></i>
                    <i></i>
                    <i></i>
                </div>
              
                <ul id="nav-lists">
                    <li class="close"><span onClick={Hide}>×</span></li>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/movie'>Movie</Link></li>
                    <li><Link to='/tv'>TV Shows</Link></li>
                </ul>
             
            </div>
      </div>
    </div>
  );
}

