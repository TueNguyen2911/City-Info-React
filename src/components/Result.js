import React, { useEffect } from 'react'
import { useState } from 'react'
import { Card } from 'react-bootstrap';
import { MdExpandMore } from 'react-icons/md'
import axios from 'axios'
import Map from './Map';
const google = window.google;
const Result = ({searchData}) => {
    const [resultData, setResultData] = useState(searchData);
    const [toProcess, setToProcess] = useState(null);
    const [image, setImage] = useState([]);
    useEffect(() => {
        searchData.data.forEach(async(elem, idx) => {
            try {
            const proxyUrl = "https://tues-cors-anywhere.herokuapp.com/"; 
            let api_url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${elem.name + "," + elem.sys.country}&key=AIzaSyDPvB4xdaK78mfB3LETo97zJ-dOFHBqdLs&inputtype=textquery&fields=name,photos`
            console.log(api_url);
            const initialPlacesRequest = await axios.get(proxyUrl + api_url).catch(console.error);
            const photoRef = initialPlacesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
            console.log(photoRef);
            if (photoRef) {
                const imageLookupURL = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=AIzaSyDPvB4xdaK78mfB3LETo97zJ-dOFHBqdLs&maxwidth=700&maxheight=700`;
                const imageURLQuery = await fetch(proxyUrl + imageLookupURL)
                .then(r => r.blob())
                .catch(console.error);
                const img = URL.createObjectURL(imageURLQuery); //declared earlier
                console.log(img);
                setImage(prevState => [...prevState, img]);
                }
            } catch(error) {
                console.log(error)
            }

        })
    }, [])
    useEffect(() => {
        let localData = null; 
        if(resultData.data !== null) {
            localData = resultData.data; //using localData to splice the array if exceeds 3 
            console.log(localData)
            if(resultData.data.length > 3) {

                setToProcess(prevState => ({...prevState, trimmedData: localData.slice(0,3), pageNumber: 1, totalPage: Math.ceil(localData.length / 3)}));
            }
            else {
                localData = resultData.data; 
                setToProcess(prevState => ({...prevState, trimmedData: localData, pageNumber: 1, totalPage: 1}));
            }
        }
    }, [resultData])

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
        console.log(dataToChange);
        
        setResultData(prevState => ({...prevState, [prevState.data[index]]: dataToChange}));
        
    }

    return (
        <div className="Result">
            <div className="card-flex-container">
            {toProcess !== null && image.length > 0 ? toProcess.trimmedData.map((data, idx) => {
                return (
                <Card  key={data.id} id={data.id}>
                    <Card.Body >
                    <Card.Title>{data.name}, {data.sys.country} <img src={`https://www.countryflags.io/${data.sys.country}/shiny/64.png`} alt='flag of a country' /></Card.Title>
                    <img src={image[idx]} />
                    <div className={"detailed-info-container"}>
                        <div className={(data.isToggled ? "detailed-info-container-show" : "detailed-info-container-close")}>
                            
                            <Map cityData={data} isMarkerShown={true} />
                        </div>
                    </div>
                    </Card.Body>
                    <div className="show-icon-container">
                    <MdExpandMore size={30} className="show-icon" id={"of-card-" + data.id} onClick={toggleDetail}/>
                    </div>
                </Card>
                )
            }): <h1>Nothing yet</h1>}
            </div>
            <div className="pagination-container">
                {toProcess !== null ? Array.from({length: toProcess.totalPage}).map((data, idx) => {
                    return(
                    <button key={idx} className={"pagination-btn " + (toProcess.pageNumber == (idx + 1) ? 'active' : null)}>
                        {idx + 1}
                    </button> )
            }) : null}
            </div>
        </div>
    )
    return (
        <div>
            hi
        </div>
    )
}

export default Result
