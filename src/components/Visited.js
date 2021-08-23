import React from 'react'
import Pagination from './Pagination'; 
import { useState, useEffect } from 'react';
import Map from './Map';
import { Card } from 'react-bootstrap';
//p_ means parent's or passed
const Visited = ({p_visitedCities}) => {
    const [toProcess, setToProcess] = useState(null);
    //component did mount
    useEffect(() => {
        console.log(`%c Visited mounted`, 'background: #222; color: red');
        if(p_visitedCities.length > 0) {
            if(p_visitedCities.length > 3) {
                setToProcess(prevState => ({...prevState, trimmedData: p_visitedCities.slice(0,3), pageNumber: 1, totalPage: Math.ceil(p_visitedCities.length / 3)}));
            }
            else {
                setToProcess(prevState => ({...prevState, trimmedData: p_visitedCities, pageNumber: 1, totalPage: 1}));
            }
        }
    }, []);
    useEffect(() => {
        console.log(`%c Visited mounted`, 'background: #222; color: red');
        if(p_visitedCities.length > 0) {
            if(p_visitedCities.length > 3) {
                setToProcess(prevState => ({...prevState, trimmedData: p_visitedCities.slice(0,3), pageNumber: 1, totalPage: Math.ceil(p_visitedCities.length / 3)}));
            }
            else {
                setToProcess(prevState => ({...prevState, trimmedData: p_visitedCities, pageNumber: 1, totalPage: 1}));
            }
        }
    }, [p_visitedCities]);

    const changePage = (pageNum) => {
        if(pageNum != toProcess.pageNumber) {
            const start = (pageNum * 3) - 3
            const end =  (pageNum * 3) >= p_visitedCities.length ? p_visitedCities.length : (pageNum * 3) % p_visitedCities.length;
            console.log(p_visitedCities.slice(start, end), start, end);
            setToProcess(prevState => ({...prevState, trimmedData: p_visitedCities.slice(start, end), pageNumber: pageNum}));
        }
    }
    return (
        <div className="Visited">
            <div className="card-flex-container">
            {p_visitedCities.length >= 0 && toProcess !== null ? (toProcess.trimmedData.map((data, idx) => { //using p_visitedCities.length bc toProcess might not be updated in time react renders UI
                return (
                <Card  key={data.id} id={data.id}>
                    <Card.Body >
                    <div className="basic-info-container">
                    <div>
                        <Card.Title>{data.name}, {data.sys.country} <img src={`https://www.countryflags.io/${data.sys.country}/shiny/64.png`} alt='flag of a country' /></Card.Title>
                        <h1>{data.main.temp}°C<img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} /></h1>
                        <div>
                            Feels like {data.main.feels_like}°C, {data.weather[0].description} 
                        </div>
                    </div>
                    {data.image ? <img className="city-image" src={data.image} alt="error or there's no picture" /> : 'Loading...' }
                    </div>

                    <div className={"detailed-info-container"}>
                        <div className={"detailed-info-container-show"}>
                            <div className="detailed-info">
                                Max: {data.main.temp_min}°C <br />
                                Min: {data.main.temp_max}°C <br />
                                Humidity: {data.main.humidity}% <br />
                                {data.main.pressure}hPA <br />
                                Visibility: {data.visibility / 1000} km
                            </div>
                            <Map cityData={data} />
                        </div>
                    </div>
                    </Card.Body>
                </Card>
                )
            })
            
            ): <h1>You haven't visited a city, expand a city card to visit it</h1>}
            </div>
            {toProcess !== null ? <Pagination totalPage={toProcess.totalPage} pageNumber={toProcess.pageNumber} onClickPageButton={changePage}/> : null}

        </div>
    )
}

export default Visited
