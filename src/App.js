import './App.css';
import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@mui/material';

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';

import { getPlacesData } from './api';

const  App = () => {

  const [childClicked, setChildClicked] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);

  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude} }) => {
        setCoordinates({ lat: latitude, lng: longitude});
    })
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating])

  useEffect(()=> {
    if(bounds.sw && bounds.ne){
      setIsLoading(true)
      getPlacesData(type, bounds.sw, bounds.ne)
      .then((data) =>{
        // console.log({childClicked});
        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
        setFilteredPlaces([])
        setIsLoading(false)
        
      })
    }
    console.log(places)
    console.log(filteredPlaces)
  }, [type, bounds])




  return (
    <>

      <div className='container'>
        <div className='menu'>
        <Header setCoordinates={setCoordinates}/>
          <List
           places={filteredPlaces.length ? filteredPlaces : places}
           childClicked={childClicked}
           isLoading={isLoading}
           type={type}
           setType={setType}
           rating={rating}
           setRating={setRating}
           />
        </div>
        <div className='map'>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces :places}
            setChildClicked={setChildClicked}
          />
        </div>
        </div>
    </>
  );
}

export default App;
