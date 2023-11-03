import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import styles from '../../styles/header.module.css'
import SearchIcon from '@mui/icons-material/Search';

const Header = ({setCoordinates}) => {

  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoComp) => setAutocomplete(autoComp)

  const onPlaceChanged = () =>{
    console.log(autocomplete)
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      setCoordinates({lat, lng});
      
    }

  return (
    // <div >
    //   <h1>Header</h1>
    // </div>
    // <AppBar elevation={0} position="static" sx={{background:'transparent'}}>
    //   <Toolbar className={styles.toolbar}>
        // <Typography variant="h5" className={styles.title}>
        //   Travel Advisor
        // </Typography>
        <Box display="flex"
        className={styles.toolbar} >
          {/* <Typography variant="h6" className={styles.title}>
            Explore new places
          </Typography> */}

          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={styles.search}>
              <div className={styles.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" />
            </div>
          </Autocomplete>
        </Box>
      /* </Toolbar>
    </AppBar> */
  );
};

export default Header;