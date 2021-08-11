// import React, { useState } from 'react';
// import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import GoogleMapReact from 'google-map-react';
// // const Marker = ({text}) => {
// //     return(
// //     <div style={{display: "inline-block"}}>
// //         {text}
// //     </div>
// //     )
// // }
// // const Map = ({cityData}) => {
// //     //const [mapData, setMapData] = useState(cityData);
// //     return(
// //         <div style={{width: '100%', height: '300px'}}>
// //             <GoogleMapReact bootstrapURLKeys={{ key: 'AIzaSyBG5DFWyI-bc174aKbmuKd1FKCeRNo7dDM'}} defaultCenter={{lat: cityData.coord.lat, lng: cityData.coord.lon}} defaultZoom={8}>
// //                 <Marker lat={cityData.coord.lat} lng={cityData.coord.lon} text={cityData.name}></Marker>
// //             </GoogleMapReact>
// //         </div>
// //     )
// // }
// const loadMap = () => {
//     return (
//     <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{ lat: -34.397, lng: 150.644 }}
//     >
//     </GoogleMap>
//     )
// }
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBG5DFWyI-bc174aKbmuKd1FKCeRNo7dDM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,  
    containerElement: <div className="Map" style={{ height: `400px` }} />,
    mapElement: <div  style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.cityData.coord.lat, lng: props.cityData.coord.lon }}
  >
    <Marker position={{ lat: props.cityData.coord.lat, lng: props.cityData.coord.lon }} />
  </GoogleMap>

)
export default Map