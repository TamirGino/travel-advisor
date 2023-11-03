import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import Rating from '@mui/material/Rating';

import PlaceDetails from '../PlaceDetails/PlaceDetails';
import styles from '../../styles/list.module.css'

const List = ({places, childClicked, isLoading, type, setType, rating, setRating}) => {
    
  const [elRefs, setElRefs] = useState([]);


  const handleTabChange = (event, newValue) => {
    setType(newValue);
  };


  // console.log({childClicked});

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef())
    setElRefs(refs);
    // console.log("childClicked")
    // console.log(refs)
    // setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
  }, [places]);

  return (
    <div className={styles.container}>
      {/* <Typography align='center' variant="h4">Travel Advisor</Typography> */}
      {isLoading ? (
        <div className={styles.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl >
            {/* <InputLabel id="type">Type</InputLabel> */}
            {/* <Select id="type" value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select> */}

        <Tabs
            value={type} onChange={handleTabChange} aria-label="icon label tabs example">
          <Tab sx={{fontSize:14}} icon={<RestaurantOutlinedIcon />} label="restaurants" value="restaurants"/>
          <Tab sx={{fontSize:14}} icon={<NightShelterOutlinedIcon />} label="hotels" value="hotels" />
          <Tab sx={{fontSize:14}} icon={<AttractionsOutlinedIcon />} label="attractions" value="attractions" />
          <Tab sx={{fontSize:14}} icon={<WbSunnyOutlinedIcon />} label="weather" value="weather" />
        </Tabs>

          </FormControl>

          <FormControl className={styles.formControl}>
          <Typography align='center' component="legend">Filter By Rating</Typography>
          <Rating
            id="rating"
            name="simple-controlled"
            value={rating}
            size="large"
            onChange={(event) => {
              setRating(event.target.value);
            }}
          />
            {/* <InputLabel id="rating">Rating</InputLabel>
            <Select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select> */}
          </FormControl>
          
          <Grid container spacing={2} className={styles.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails
                 place={place}
                 selected={Number(childClicked) === i}
                 refProp={elRefs[i]}
                 />
              </Grid>
            ))}
          </Grid>
        </>
       )}
    </div>
  );
};

export default List;