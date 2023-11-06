import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery, Rating, Box } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import styles from '../../styles/map.module.css'
import restaurantImg from '../../assets/Restaurant_Placeholder.png'
// import Rating from '@mui/material/Rating';


// import Rating from '@material-ui/lab/Rating';

import mapStyles from '../Map/mapStyles';
// import useStyles from './styles.js';

const Map = ({setCoordinates, setBounds, coordinates, places, setChildClicked }) => {

  const isDesktop = useMediaQuery('(min-width:1200px)');
  

  return (
    <div className={styles.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        options={{fullscreenControl: false, zoomControl: true, styles: mapStyles}}
        onChange={(e) => {  
            setCoordinates({lat: e.center.lat, lng: e.center.lng})
            setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
          className={styles.markerContainer}
          lat={Number(place.latitude)}
          lng={Number(place.longitude)}
          key={i}
          >
            {
              !isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize='large'/>
              ) : (
                <Paper elevation={3} className={styles.paper}>
                    <Typography className={styles.typography} variant='subtitle2' gutterBottom>
                      {place.name}
                    </Typography>
                    <img
                      className={styles.pointer}
                      src={place.photo ? place.photo.images.large.url : restaurantImg}
                      alt={place.name}
                    />
                    <Rating name="read-only" size="small" value={Number(place.rating)} readOnly />
                </Paper>
               )}
        </div>   
         ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
