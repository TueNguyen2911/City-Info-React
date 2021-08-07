import React from 'react'
import { MdSearch } from "react-icons/md";
import jsonBulk from '../jsonData/city.list.json'; 
import axios from 'axios'
import { Alert } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

const Search = ({parentSearchData, handleSearchData}) => {
    const history = useHistory();
    const [searched, setSearched] = useState(false);
    const [searchData, setSearchData] = useState({
        data: [],
        keyAlert: null,
        message: '',
        string: ''
    })
    useEffect(() => {
        console.log('searchData changes');
        if((searchData.keyAlert !== 'danger' && searchData.keyAlert !== null && searchData.data.length > 0)) {
            console.log('passing to handleSearch', searchData)
            handleSearchData(searchData);

        }
    }, [searchData])
    const checkSearch = (e) => {
        e.preventDefault();
        const string = e.target.search_input.value.replace(/\s/g,'').toLowerCase();
        setSearchData(prevState => ({...prevState, string: string}));
        let city = ''; 
        let api_url = '';
        if(string.indexOf(',') > 0) {
            city = string.substr(0, string.indexOf(',')); 

            let country = string.substr(city.length + 1, string.length - 1); 
            console.log(city, city.length);
            console.log(country, country.length);
            api_url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=1c4993f81daae9d4eaf06858adea5d31&units=metric`;
        }
        else {
            city = string; 
            
            let city_ids = '';
            if(jsonBulk) {
                jsonBulk.forEach( (bulkData, index) => {
                    if(bulkData.name.replace(/\s/g,'').toLowerCase() === city)
                        city_ids += bulkData.id.toString() + ','; //dealing with comma ','
                    if(index === jsonBulk.length - 1) 
                        city_ids = city_ids.substr(0, city_ids.length - 1);
                })
            }
            api_url = `http://api.openweathermap.org/data/2.5/group?id=${city_ids}&appid=1c4993f81daae9d4eaf06858adea5d31&units=metric`;
        }   
        getSearchedData(api_url)
    }
    const getSearchedData = async(api_url) => {
        console.log(api_url)
        try {
            const res = await axios.get(api_url);
            const resData = res.data;
            let message = '';
            console.log('calling api from Search', resData); 
            if(resData.hasOwnProperty('cnt')) {
                message = `Found ${resData.cnt} results`;
                console.log(resData.list);
                let arrayRes = resData.list; 
                let dataArray2 = []
                arrayRes.forEach((elem, idx) => {
                    console.log(idx);
                    dataArray2.push(elem);
                })
                console.log('dataArray2', dataArray2);
                let dataArray = resData.list.slice(0, resData.cnt);
                console.log(dataArray);
                setSearched(true);
                setSearchData(prevState => ({data: dataArray2, keyAlert: 'success', message: message}));
                history.push({pathname: '/result'})
            }
            else {
                message = `Found a result`;
                //dataArray = [resData];
                setSearchData(prevState => ({...prevState, data: [resData], keyAlert: 'success', message: message}));
            }
            //console.log('dataArray after calling', dataArray);
            //setSearchData(prevState => ({...prevState, data: dataArray, keyAlert: 'success', message: message}));

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
        </form>
    )
}

export default Search
