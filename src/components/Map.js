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