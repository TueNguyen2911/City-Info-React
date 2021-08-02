import React, { useEffect } from 'react'
import { useState } from 'react'
import { Card } from 'react-bootstrap';
import { MdExpandMore } from 'react-icons/md'
import Map from './Map';
const google = window.google;
const Result = ({searchData}) => {
    const [resultData, setResultData] = useState(searchData);
    const [toProcess, setToProcess] = useState(null);
    useEffect(() => {

    }, [])
    useEffect(() => {
        console.log(resultData)
        let localData = null; 
        if(resultData.data !== null) {
            localData = resultData.data;
            if(resultData.data.length > 3) {
                console.log(localData)
                setToProcess(prevState => ({...prevState, trimmedData: localData.splice(0,3), pageNumber: 1, totalPage: Math.floor(localData.length / 3)}));
            }
            else {
                localData = resultData.data; 
                console.log(localData)
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
            {toProcess !== null ? toProcess.trimmedData.map((data, idx) => {
                return (
                <Card  key={data.id} id={data.id}>
                    <Card.Body >
                    <Card.Title>{data.name}</Card.Title>
                    <Map cityData={data} />
                    {/* <div className={"detailed-info-container"}>
                        <div className={(data.isToggled ? "detailed-info-container-show" : "detailed-info-container-close")}>
                            Hi
                            <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
                            <Map cityData={data} />
                        </div>
                    </div> */}
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
                    <button className="pagination-btn" key={idx} className={toProcess.pageNumber == (idx + 1) ? 'active' : null}>
                        {idx + 1}
                    </button> )
            }) : null}
            </div>
        </div>
    )
}

export default Result
