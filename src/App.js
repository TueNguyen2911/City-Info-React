import React, { useState, useEffect } from 'react'
import LocationInfo from './components/LocationInfo'
import NavBar from './components/NavBar'
import { useHistory } from 'react-router'
import { BrowserRouter as Router, Link, Redirect, Route, Switch } from 'react-router-dom'
import Search from './components/Search'
import Visited from './components/Visited'
import Result from './components/Result'
const App = () => {
  const history = useHistory();
  const [locationData, setLocationData] = useState({
    weather: null, 
    flag: null
  });
  const [searchData, setSearchData] = useState(null)
  const [visitedCities, setVisitedCities] = useState([]); 

  const handleLocationData = (weather, flag) => {
    setLocationData(prevState => ({...prevState, weather: weather, flag: flag})); 
  }
  const handleSearchData = (searchData) => {
    console.log('from handle search Data', searchData)
    setSearchData(searchData); 
  }
  const handleVisitedCities = (visited) => {
    console.log('from handle visited cities', visited); 
    if(visited.length > 0) {
      setVisitedCities(prevState => [...prevState, ...visited]);
    }
  }
  return (
    <Router>
    <div id="container">
      <NavBar />
    </div>
      <Route exact path="/"  render={() => {
        return <Redirect to="/home" />
      }}/>

      <Route exact path="/home" render={(props) => (
        <>
          <Search handleSearchData={handleSearchData}/>
          <LocationInfo locationData={locationData} handleLocationData={handleLocationData}/>
        </>
      )} />

      <Route exact path='/result' render={(props) => (
        <>
          {searchData === null ? 
              <Redirect to="/home" /> : 
            <> 
              <Search handleSearchData={handleSearchData}/>
              <Result key={(searchData.string)} searchData={searchData} handleVisitedCities={handleVisitedCities}/>
              
            </>
          }
        </>
      )} />
      <Route exact path="/visited" render={(props) => (
        <>
          <Visited p_visitedCities={visitedCities} />
        </>
      )} />

    </Router>
  )
}

export default App

