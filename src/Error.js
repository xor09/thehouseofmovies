import React from 'react';
import errorimage from './images/404-page-not-found.jpg';

export function Error(){

    return (
        <img src={errorimage} alt='404 page not found' style={{maxWidth: '100%', height: 'auto'}}/>
    )
}