import React, {Component} from "react";
import { render } from 'react-dom';
import Map from '../views/Map';
import credentials from "../credentials";
import Marker from "react-google-maps/lib/components/Marker";

const mapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${credentials.mapsKey}`
const GMaps = props => {
    return (
            <div>
                <Map
                googleMapURL = {mapURL}
                containerElement= {<div style ={{height :'88vh'}}/>}
                mapElement = {<div style  ={{height :'100%'}}/>}
                    loadingElement = {<p> Loading </p>}
                >

                </Map>

            </div>
        )
}

export default GMaps