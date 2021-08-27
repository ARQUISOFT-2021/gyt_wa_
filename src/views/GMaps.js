import React, {Component} from "react";
import { render } from 'react-dom';
import Map from '../components/Map';
import credentials from "../credentials";

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`
const GMaps = props => {
    return (
            <div>
                <Map
                googleMapURL = {mapURL}
                containerElement= {<div style ={{height :'400px'}}/>}
                mapElement = {<div style  ={{height :'400%'}}/>}
                    loadingElement = {<p> Loading </p>}
                />
            </div>
        )
}

export default GMaps