import React from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'

//locationData is data from App, handleLocationData passes locData back
const LocationInfo = ({locationData, handleLocationData}) => {  
    const [locData, setLocData] = useState({
      weather: null,
      flag: null
    });
    //position: lat + long, calling api with lat and long 
    const getLocationAPIData = async(position) => {
      try {
          const api_url = (`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${process.env.REACT_APP_APP_ID}&units=metric`);
          console.log(api_url);
          const res = await axios.get(api_url);
          console.log('calling api from LocationInfo', api_url)
          setLocData(prevState => ({...prevState, flag: `https://www.countryflags.io/${res.data.sys.country}/shiny/64.png`}))
          setLocData(prevState => ({...prevState, weather: res.data}));
      } catch(error) {
          console.log(error); 
      }
  }
  const getLocationData = async() => {
      if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              getLocationAPIData(position);
          })
      }
  }
  //componentDidMount
  useEffect(() => {
    locationData.flag === null ? getLocationData() : setLocData(locationData);
  }, [])
  //pass data back to App when locData is not null 
  useEffect(() => {
    return () => {
      if(locData.weather !== null) {
        console.log('loc data changes');
        handleLocationData(locData.weather, locData.flag);
      }
    }
  }, [locData]);
    return (
        <div className="LocationInfo">
            <div className="card-flex-container">
                {locData.weather !== null && locData.flag !== null ? (
                <Card style={{ width: '60%' }}>
                <Card.Body>
                  <Card.Title>{locData.weather.name}, {locData.weather.sys.country} <img src={locData.flag} alt='flag of a country' /></Card.Title>
                    <h1>{locData.weather.main.temp}°C</h1>
                    Feels like {locData.weather.main.feels_like}°C
                  <br />
                </Card.Body>
              </Card>

               )
              : <p>Loading...</p>}
            </div>
        </div>
    )
}
export default LocationInfo
