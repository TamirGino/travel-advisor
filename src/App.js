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

  // const onLoad = (autoC) => setAutocomplete(autoC);

  // const onPlaceChanged = () => {
  //   const lat = autocomplete.getPlace().geometry.location.lat();
  //   const lng = autocomplete.getPlace().geometry.location.lng();

  //   setCoordinates({ lat, lng });
  // };

  return (
    <>
    <CssBaseline />
      <Header setCoordinates={setCoordinates}/>
      <Grid container spacing={0} >
        <Grid item xs={12} md={4}
        //  className='menu_section'
         >
         {/* <Header setCoordinates={setCoordinates}/> */}
          <List
           places={filteredPlaces.length ? filteredPlaces : places}
           childClicked={childClicked}
           isLoading={isLoading}
           type={type}
           setType={setType}
           rating={rating}
           setRating={setRating}
           />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces :places}
            setChildClicked={setChildClicked}
          />
        </Grid>
        </Grid>
    </>
  );
}

export default App;