import React from 'react'
import { MdSearch } from "react-icons/md";
import jsonBulk from '../jsonData/city.list.json'; 
import axios from 'axios'
import { Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const Search = ({parentSearchData, handleSearchData}) => {
    const history = useHistory();
    const [searchData, setSearchData] = useState({
        data: [],
        keyAlert: null,
        message: '',
        string: '', 
        og_string: ''
    })
    var forUS_Obj = [{}]; 
    useEffect(() => {
        console.log('searchData changes');
        if((searchData.keyAlert !== 'danger' && searchData.keyAlert !== null && searchData.data.length > 0 && searchData.string != '')) {
            console.log('passing to handleSearch', searchData)
            handleSearchData(searchData);

        }
    }, [searchData])
    const checkSearch = (e) => {
        e.preventDefault();
        setSearchData(prevState => ({...prevState, og_string: e.target.search_input.value}));
        const string = e.target.search_input.value.replace(/\s/g,'').toLowerCase();
        if(string !== searchData.string)
            console.log(`%c Not same search string `, 'background: #222; color: red');
        setSearchData(prevState => ({...prevState, string: string}));
        let city = ''; 
        let api_url = '';
        if(string.indexOf(',') > 0) {
            city = string.substr(0, string.indexOf(',')); 

            let country = string.substr(city.length + 1, string.length - 1); 
            console.log(city, city.length);
            console.log(country, country.length);
            api_url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${process.env.REACT_APP_APP_ID}&units=metric`;
        }
        else {
            city = string; 

            let city_ids = '';
            if(jsonBulk) {
                jsonBulk.forEach( (bulkData, index) => {
                    if(bulkData.name.replace(/\s/g,'').toLowerCase() === city) {
                        city_ids += bulkData.id.toString() + ','; //dealing with comma ','
                        if(bulkData.country === "US") {
                            forUS_Obj.push({id: bulkData.id, name: city, state: bulkData.state})
                        }
                    }
                    if(index === jsonBulk.length - 1) 
                        city_ids = city_ids.substr(0, city_ids.length - 1);
                })
            }
            api_url = `http://api.openweathermap.org/data/2.5/group?id=${city_ids}&appid=${process.env.REACT_APP_APP_ID}&units=metric`;
        }   
        getSearchedData(api_url)
    }
    const getSearchedData = async(api_url) => {
        console.log(api_url)
        try {
            const res = await axios.get(api_url);
            let dataArray;
            let message = '';

            console.log('calling api from Search', res.data); 
            if(res.data.hasOwnProperty('cnt')) {
                message = `Found ${res.data.cnt} results`;
                dataArray = [...res.data.list];
                dataArray.forEach((data, idx) => {
                    forUS_Obj.forEach((forUS, idx) => {
                        if(data.sys.country === "US" && data.name.replace(/\s/g,'').toLowerCase() == forUS.name && data.id === forUS.id) {
                            data.sys.state = forUS.state; 
                        }
                    })
                })
                console.log(dataArray);

                setSearchData(prevState => ({...prevState, data: dataArray, keyAlert: 'success', message: message}));
            }
            else {
                message = `Found a result`;
                dataArray = [res.data]; 
                dataArray.forEach((data, idx) => {
                    forUS_Obj.forEach((forUS, idx) => {
                        if(data.sys.country === "US" && data.name.replace(/\s/g,'').toLowerCase() == forUS.name && data.id === forUS.id) {
                            data.sys.state = forUS.state; 
                        }
                    })
                })
                setSearchData(prevState => ({...prevState, data: dataArray, keyAlert: 'success', message: message, string: prevState.string}));
            }
            //console.log('dataArray after calling', dataArray);
            //setSearchData(prevState => ({...prevState, data: dataArray, keyAlert: 'success', message: message}));
            history.push({pathname: '/result'})
        } catch(error) {
            console.log(error.message);
            setSearchData(prevState => ({...prevState, data: null, keyAlert: 'danger', message: error.message}));
        }
    }
    return (
        <form className="Search" onSubmit={checkSearch} autoComplete="off"> 
            <div id="search-container">
            <div id="search-wrap">
                <input type="text" id="search_input" placeholder="Toronto or Toronto,CA" />
                <button id="search-btn"type="submit"><MdSearch size={50}/></button>
            </div>
            </div>
            {searchData.message !== '' && searchData.keyAlert === "danger" ? 
                <Alert style={{width: "30%", textAlign: "center", margin: "auto", marginTop: "10px"}} variant={searchData.keyAlert}>
                    Found no city with "{searchData.og_string}"
                </Alert> : null
            }
        </form>
    )
}

export default Search
