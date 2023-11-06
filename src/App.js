import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { getPlacesData, getWeatherData } from './api';


const  App = () => {

  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [timeZone, setTimeZone] = useState();
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude} }) => {
        setCoordinates({ lat: latitude, lng: longitude});
    })
  }, [])

  useEffect(()=> {
    if (type !== "weather"){
      setWeatherData({});
        if(bounds.sw && bounds.ne){
          setIsLoading(true)
          getPlacesData(type, bounds.sw, bounds.ne)
          .then((data) =>{
            setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
            setIsLoading(false)
          })
        }
    } else {
        if(coordinates){
          getWeatherData(coordinates)
          .then((weatherData) =>{
            setWeatherData(weatherData)
          })
      }
    }
  }, [type, bounds])

  useEffect(() => {
    const updateBackgroundColor = async () => {
      try {
        const data = await getWeatherData(coordinates);
        const isDay = data.current.is_day;
        const menuElement = document.querySelector('.menu');
        console.log(isDay)
          setTimeZone(isDay)
          menuElement.classList.remove('day', 'night');
          if (isDay === 1) {
            menuElement.classList.add('day');
          } 
          else {
             menuElement.classList.add('night');
          }
      } catch (error) {
        console.error('Error fetching time:', error);
        // const menuElement = document.querySelector('.menu');
        // menuElement.classList.add('default');
      }
    };
  
    updateBackgroundColor();
  }, [coordinates]);

  return (
    <>
      <div className='container'>
        <div className='menu'>
        <Header setCoordinates={setCoordinates}/>
          <List
           weatherData={weatherData}
           places={places}
           childClicked={childClicked}
           isLoading={isLoading}
           type={type}
           setType={setType}
           timeZone={timeZone}
           />
        </div>
        <div className='map'>
          <Map 
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setChildClicked={setChildClicked}
          />
        </div>
      </div>
    </>
  );
}

export default App;
