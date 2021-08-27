import React from "react";
import {
    GoogleMap,
    withScriptjs,
    withGoogleMap
} from "react-google-maps";
import Marker from "react-google-maps/lib/components/Marker";


const  Map = (props)=>{
    return(
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: -34.398, lng: 150.643 }}
        > <Marker key="marker_2"
                  position={{lat:  -34.488661, lng: 150.422590}}
        />
        <Marker key="marker_1"
                position={{lat:  -34.459278, lng:  150.846808}}
        />
        <Marker key="marker_3"
                     position={{lat:  -34.586277, lng: 150.777091}}
        />
        </GoogleMap>
    );
};

export default withScriptjs(
    withGoogleMap(
        Map
    )
)