import React, { useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, FormControl, useMediaQuery } from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AttractionsOutlinedIcon from '@mui/icons-material/AttractionsOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import NightShelterOutlinedIcon from '@mui/icons-material/NightShelterOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import WeatherCard from '../Weather/WeatherCard';
import styles from '../../styles/list.module.css'

const List = ({places, childClicked, isLoading, type, setType, timeZone, weatherData}) => {
    
  const [elRefs, setElRefs] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleTabChange = (event, newValue) => {
    setType(newValue);
  };

  useEffect(() => {
    const refs = Array(places?.length).fill().map((_, i) => elRefs[i] || createRef())
    setElRefs(refs);
  }, [places]);

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className={styles.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl >
        <Tabs
            value={type} onChange={handleTabChange} 
            TabIndicatorProps={{
              style: {
                backgroundColor: timeZone === 0 ? "white" : "#1976d2",
              }
            }}
            sx={{ "& .css-16cc630-MuiButtonBase-root-MuiTab-root.Mui-selected": {
              color: timeZone === 0 ? "white" : "#1976d2",
            }}}
             >
          <Tab sx={{fontSize: isMobile ? 10 : 14}} icon={<RestaurantOutlinedIcon />} label="restaurants" value="restaurants"/>
          <Tab sx={{fontSize: isMobile ? 10 : 14}} icon={<NightShelterOutlinedIcon />} label="hotels" value="hotels" />
          <Tab sx={{fontSize: isMobile ? 10 : 14}} icon={<AttractionsOutlinedIcon />} label="attractions" value="attractions" />
          <Tab sx={{fontSize: isMobile ? 10 : 14}} icon={<WbSunnyOutlinedIcon />} label="weather" value="weather" />
        </Tabs>

          </FormControl>

          {Object.keys(weatherData).length > 0 ? (
            <WeatherCard weatherData={weatherData} />
          ) : (
          <>
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
      </>
    )}
  </div>
  );
};

export default List;