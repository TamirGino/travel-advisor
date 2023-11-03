import React, { useState, useEffect, createRef } from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip, Rating } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import styles from '../../styles/placeDetails.module.css'
import restaurantImg from '../../assets/Restaurant_Placeholder.png'


const PlaceDetails = ({ place, selected, refProp }) => {

  // useEffect(() => {
  //   if(selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   console.log("refProps")
  // }, [refProp]);
  
  if(selected){
    refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // console.log("refProps")
    // console.log(refProp)
  } 
  
    return(
        <Card elevation={6} sx={{borderRadius:5, position:'relative'}}>
            <CardMedia
                style={{ paddingTop:'70%' }}
                image={place.photo ? place.photo.images.large.url : restaurantImg}
                title={place.name}
            />
        <CardContent>
        <Typography gutterBottom variant="h5">{place.name}</Typography>
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place.rating)} readOnly />
          <Typography component="legend">{place.num_reviews} review{place.num_reviews > 1 && 's'}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography component="legend">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box display="flex" justifyContent="space-between" my={1} alignItems="center">
            <img src={award.images.small} />
            <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={styles.chip} />
        ))}
        {place.address && (
          <Typography gutterBottom variant="body2" color="textSecondary" className={styles.subtitle}>
            <LocationOnIcon />{place.address}
          </Typography>
        )}
        {place.phone && (
          <Typography variant="body2" color="textSecondary" className={styles.spacing}>
            <PhoneIcon /> {place.phone}
          </Typography>
        )}
      </CardContent>

      <CardActions>
        <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
          Trip Advisor
        </Button>
        <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
          Website
        </Button>
      </CardActions>
        </Card>
    )
}
export default PlaceDetails;