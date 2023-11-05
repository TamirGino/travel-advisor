import React, { useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { AppBar, Toolbar, Typography, InputBase, Box } from '@mui/material';
import styles from '../../styles/header.module.css'
import SearchIcon from '@mui/icons-material/Search';
import './autoComplete.css'
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

        <Box display="flex" mt={2}
        className={styles.toolbar} >
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} className='autoComplete' 
            >
            <div className={styles.search}>
              <div className={styles.inputBase}>
              <InputBase placeholder="Search For Travel Advise" />
              </div>
              <div className={styles.searchIcon}>
                <SearchIcon />
              </div>
            </div>
          </Autocomplete>
        </Box>

  );
};

export default Header;