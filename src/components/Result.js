import React, { useEffect } from 'react'
import { useState } from 'react'
import { Card } from 'react-bootstrap';
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
    return (
        <div className="Result">
            <div className="card-flex-container">
            {toProcess !== null ? toProcess.trimmedData.map((data) => {
                return (
                <Card>
                    <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    </Card.Body>

                </Card>
                )
            }): <h1>Nothing yet</h1>}
            </div>
        </div>
    )
}

export default Result
