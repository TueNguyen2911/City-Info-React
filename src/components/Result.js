import React, { useEffect } from 'react'
import { useState } from 'react'
import { Card } from 'react-bootstrap';
import { MdExpandMore } from 'react-icons/md'
import axios from 'axios'
import Map from './Map';
import Pagination from './Pagination';
const Result = ({searchData, handleVisitedCities}) => {
    const [resultData, setResultData] = useState(searchData);
    const [toProcess, setToProcess] = useState(null);
    const [image, setImage] = useState([]);
    //getImages call 2 apis, 1 to get photoRef, use photoRef to call 2nd api to get photo
    const getImages = () => {
        searchData.data.forEach(async(elem, idx) => {
            try {
            const proxyUrl = "https://tues-cors-anywhere.herokuapp.com/"; 
            let api_url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${elem.name + "," + (elem.sys.state ? elem.sys.state + "," : '') + elem.sys.country.toLowerCase()}&inputtype=textquery&fields=name,photos&key=${process.env.REACT_APP_GG_KEY}`
            const placesRequest = await axios.get(proxyUrl + api_url);
            const photoRef = placesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
            if(photoRef) {
                const placePhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${process.env.REACT_APP_GG_KEY}&maxwidth=700&maxheight=700`;
                const imageURLQuery = await fetch(proxyUrl + placePhotoUrl)
                .then(r => r.blob())
                .catch(console.error);
                const img = URL.createObjectURL(imageURLQuery); 
                console.log(idx);
                setImage(prevState => [...prevState, {img: img, id: elem.id}]);

            }
            else {
                console.log(idx);
                setImage(prevState => [...prevState, {img: null, id: elem.id}]);
            }
            } catch(error) {
                console.log(`%c ${error} `, 'background: #222; color: red');
            }
        });
    }
    const trimData = () => {
        if(resultData.data !== null) {
            if(resultData.data.length > 3) 
                setToProcess(prevState => ({...prevState, trimmedData: resultData.data.slice(0,3), pageNumber: 1, totalPage: Math.ceil(resultData.data.length / 3)}));
            else
                setToProcess(prevState => ({...prevState, trimmedData: resultData.data, pageNumber: 1, totalPage: 1}));
        }
    }
    useEffect(() => {
        return () => {
            console.log(`%c REsult Unmounted`, 'background: #222; color: red');
            const visited = resultData.data.filter((data, idx) => {
                return data.toggled === true;
            }); 
            console.log(visited)
            handleVisitedCities(visited);
        };
      }, []);
    //component did mount
    useEffect(() => {
        setResultData(searchData)
        getImages();
        if(resultData.data !== null) {
            if(resultData.data.length > 3) 
                setToProcess(prevState => ({...prevState, trimmedData: resultData.data.slice(0,3), pageNumber: 1, totalPage: Math.ceil(resultData.data.length / 3)}));
            else
                setToProcess(prevState => ({...prevState, trimmedData: resultData.data, pageNumber: 1, totalPage: 1}));
        }
    }, []);
    useEffect(() => {
        console.log('searchData in result changes')
        getImages();
        setResultData(searchData)
        if(searchData.data !== null) {
            if(searchData.data.length > 3) 
                setToProcess(prevState => ({...prevState, trimmedData: searchData.data.slice(0,3), pageNumber: 1, totalPage: Math.ceil(searchData.data.length / 3)}));
            else
                setToProcess(prevState => ({...prevState, trimmedData: searchData.data, pageNumber: 1, totalPage: 1}));
        }
    }, [searchData]);

    useEffect(() => {
        console.log('image changes')
        let modifiedArray = [...resultData.data]; 
        modifiedArray.forEach((data, idx) => {
            const id = image.findIndex(elem => elem.id === data.id);  
            data.image = image[id]?.img;
        });     
        setResultData({data: modifiedArray})
    }, [image])

    const changePage = (pageNum) => {
        if(pageNum != toProcess.pageNumber) {
            const start = (pageNum * 3) - 3
            const end =  (pageNum * 3) >= resultData.data.length ? resultData.data.length : (pageNum * 3) % resultData.data.length;
            setToProcess(prevState => ({...prevState, trimmedData: resultData.data.slice(start, end), pageNumber: pageNum}));
        }
    }
    const toggleDetail = (e) => {
        let idToChange = e.target.id.substr(8).toString();
        let index = 0;
        let dataToChange = resultData.data.filter((data, idx) => {
            if(idToChange === data.id.toString()) {
                index = idx; 
                return data;
            }
        })[0];
        dataToChange.toggled = true; 
        dataToChange.isToggled = !dataToChange.isToggled; //!undefined = true; 
        const modifiedArray = [...resultData.data]; 
        modifiedArray[index] = dataToChange; 
        setResultData(prevState => ({...prevState, [prevState.data[index]]: dataToChange}));
        setToProcess(prevState => ({...prevState, [prevState.trimmedData[index]]: dataToChange}));   
    }

    return (
        <div className="Result">
            <div className="card-flex-container">
            {toProcess !== null ? (toProcess.trimmedData.map((data, idx) => {
                return (
                <Card  key={data.id} id={data.id}>
                    <Card.Body >
                    <div className="basic-info-container">
                    <div>
                        <Card.Title>{data.name}, {data.sys.country} <img src={`https://www.countryflags.io/${data.sys.country}/shiny/64.png`} alt='flag of a country' /></Card.Title>
                        <h1>{data.main.temp}°C<img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} /></h1>
                        <div>
                            Feels like {data.main.feels_like}°C. {data.weather[0].main}, {data.weather[0].description} 
                        </div>
                    </div>
                    {data.image ? <img className="city-image" src={data.image} alt="img of a city" /> : 'Loading...' }
                    </div>

                    <div className={"detailed-info-container"}>
                        <div className={(data.isToggled ? "detailed-info-container-show" : "detailed-info-container-close")}>
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
                    <div className="show-icon-container">
                    <MdExpandMore size={30} style={data.isToggled ? {transform: "rotate(180deg)"} : null} className="show-icon"  id={"of-card-" + data.id} onClick={toggleDetail}/>
                    </div>
                </Card>
                )
            })
            ): <h1>Loading...</h1>}
            </div>
            {/* <div className="pagination-container">
                {toProcess !== null ? Array.from({length: toProcess.totalPage}).map((data, idx) => {
                    return(
                    <button key={idx} className={"pagination-btn " + (toProcess.pageNumber == (idx + 1) ? 'active' : null)}>
                        {idx + 1}
                    </button> )
                    
            }) : null}
            </div> */}
            {toProcess !== null ? <Pagination totalPage={toProcess.totalPage} pageNumber={toProcess.pageNumber} onClickPageButton={changePage}/> : null}

        </div>
    )
    return (
        <div>
            hi
        </div>
    )
}

export default Result
//Improvement notes: 
//Make image state empty each time search data changes, it has strange behavior 
//Each time I enter different search string, only after that, image state would update the previous search cit(ies)
//Or it would increase in size