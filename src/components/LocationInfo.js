import React from 'react'
import axios from 'axios'
import { Col, Container, Row, Card, Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
const LocationInfo = ({locationData, handleLocationData}) => {
    const [locData, setLocData] = useState({
      weather: null,
      flag: null
    });
    const [locInfo, setLocInfo] = useState({
        lat: '', 
        long: '',
        dateTime: ''
    });
    //componentDidMount
    useEffect(() => {
        console.log('location did mount');
        const getAPIData = async(position) => {
            try {
                const api_url = (`http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=1c4993f81daae9d4eaf06858adea5d31&units=metric`);

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
                    getAPIData(position);
                })
            }
        }
        locationData.flag === null ? getLocationData() : setLocData(locationData);
        // if(locationData.flag === null) { for testing purpose
        //   getLocationData(); 
        // }
        // else {
        //   setLocData(locationData);
        // }
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
/* 
{
  "coord": {
    "lon": -79.3516,
    "lat": 43.7804
  },
  "weather": [
    {
      "id": 500,
      "main": "Rain",
      "description": "light rain",
      "icon": "10d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 19.27,
    "feels_like": 19.58,
    "temp_min": 18.47,
    "temp_max": 20.69,
    "pressure": 1013,
    "humidity": 89
  },
  "visibility": 10000,
  "wind": {
    "speed": 0.45,
    "deg": 252,
    "gust": 0.89
  },
  "rain": {
    "1h": 0.37
  },
  "clouds": {
    "all": 75
  },
  "dt": 1627403703,
  "sys": {
    "type": 2,
    "id": 2009209,
    "country": "CA",
    "sunrise": 1627380061,
    "sunset": 1627433194
  },
  "timezone": -14400,
  "id": 6091104,
  "name": "North York",
  "cod": 200
}
*/