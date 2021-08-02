import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
const Marker = ({text}) => {
    return(
    <div style={{display: "inline-block"}}>
        {text}
    </div>
    )
}
const Map = ({cityData}) => {
    //const [mapData, setMapData] = useState(cityData);
    return(
        <div style={{width: '100%', height: '300px'}}>
            <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyBG5DFWyI-bc174aKbmuKd1FKCeRNo7dDM'}} defaultCenter={{lat: cityData.coord.lat, lng: cityData.coord.lon}} defaultZoom={8}>
                <Marker lat={cityData.coord.lat} lng={cityData.coord.lon} text={cityData.name}></Marker>
            </GoogleMapReact>
        </div>
    )
}
export default Map