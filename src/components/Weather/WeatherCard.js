import React from 'react';
import { Box, Typography, Card, CardContent, Tabs, Tab, Radio, FormControlLabel, useMediaQuery  } from '@mui/material';
import styles from '../../styles/weatherCard.module.css'

const WeatherCard = ({weatherData}) => {

    const isMobileHeight = useMediaQuery('(max-height:700px)');
    const isMobileWidth = useMediaQuery('(max-width:450px)');

    const [tabValue, setTabValue] = React.useState(0);
    const [tempMethod, setTempMethod] = React.useState('c');

    const handleTabsChange = (event, newValue) => {
        setTabValue(newValue);
    };

  const handleTempMethodChange = (event) => {
    setTempMethod(event.target.value);
  };
  
return(

<Card elevation={0}
    sx={{borderRadius:5, position:'relative', height: isMobileHeight || isMobileWidth ? '60vh' : '75vh' ,overflow: 'auto', }}>
    <CardContent>
    <Box display="flex" justifyContent="space-between" >
        <Box display="flex" flexDirection='column' justifyContent="center" >
            <FormControlLabel
            value="C"
            control={
                <Radio
                checked={tempMethod === 'c'}
                onChange={handleTempMethodChange}
                value="c"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'C' }}
            />
            }
            label="C"
            labelPlacement="top"
            />
            <FormControlLabel
            value="F"
            control={
                <Radio
            checked={tempMethod === 'f'}
            onChange={handleTempMethodChange}
            value="f"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'F' }}
        />
            }
            label="F"
            labelPlacement="top"
            />
        </Box>  

        <Box display="flex" flexDirection='column' justifyContent="center" my={0}>
            <Typography fontFamily={'Cormorant Garamond'} fontWeight={'bold'} 
            fontSize={22} gutterBottom >
                {weatherData.location.name}
            </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" gap={0.5}>
            <Typography fontFamily={'Cookie'} gutterBottom variant="h3">
            {tempMethod === 'c' ? 
                weatherData.current.temp_c :
                weatherData.current.temp_f }
            </Typography>
            <Typography sx={{mb:5}} variant="subtitle2">
                    o
            </Typography> 
            </Box>
            <Typography gutterBottom fontStyle={'italic'} fontSize={18} fontFamily={'Edu TAS Beginner'} variant="subtitle1">
            {weatherData.current.condition.text }
            </Typography>  
        </Box>

        <Box >
            <img src={weatherData.current.condition.icon} />
        </Box>
        
    </Box>
        
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={tabValue} onChange={handleTabsChange} centered>
            <Tab label={weatherData.forecast.forecastday[0].date} />
            <Tab label={weatherData.forecast.forecastday[1].date} />
            <Tab label={weatherData.forecast.forecastday[2].date} />
        </Tabs>
    </Box>

    <Box display="flex" justifyContent="space-between" paddingRight={5} paddingLeft={5} my={3}>
        <Box>
            <Typography variant="subtitle2" component="legend"> 
                {weatherData.forecast.forecastday[tabValue].day.condition.text}
            </Typography>
            <img src={weatherData.forecast.forecastday[tabValue].day.condition.icon}/>
        </Box>

        <Box >
            <Typography gutterBottom variant="subtitle2" component="legend">Avg Humidity</Typography>
            <Box display='flex' justifyContent='center' gap={1}>
                <Typography fontFamily={'Cookie'} variant="h3" my={0}>
                {weatherData.forecast.forecastday[tabValue].day.avghumidity}
                </Typography>
                <Typography sx={{alignSelf:'flex-end', mb:1.5,}} variant="subtitle2">%</Typography>
            </Box>
        </Box>
    </Box>

    <Box display="flex" justifyContent="space-between" paddingRight={5} paddingLeft={5} my={3}>
        <Box>
            <Typography gutterBottom variant="subtitle2" component="legend">Avg Temp</Typography>
            <Box display='flex' justifyContent='center' gap={0.3}>
                <Typography fontFamily={'Cookie'} variant="h3">
                {tempMethod === 'c' ? (
                    weatherData.forecast.forecastday[tabValue].day.avgtemp_c ) : (
                    weatherData.forecast.forecastday[tabValue].day.avgtemp_f )}
                </Typography>
                <Typography sx={{alignSelf:'flex-end', mb:5}} variant="subtitle2">
                    o
                </Typography> 
            </Box>
        </Box>

        <Box>
            <Typography gutterBottom variant="subtitle2" component="legend">Chances of Rain	</Typography>
            <Box display='flex' justifyContent='center' gap={1}>
                <Typography fontFamily={'Cookie'} variant="h3">
                {weatherData.forecast.forecastday[tabValue].day.daily_chance_of_rain }
                </Typography>
                <Typography sx={{alignSelf:'flex-end', mb:1.5}} variant="subtitle2">%</Typography>
            </Box>
        </Box>
    </Box>

    <Box display="flex" justifyContent="space-between" paddingRight={3} paddingLeft={3} my={0}>
        <Box>
            <Typography gutterBottom variant="subtitle2" component="legend">Sunrise</Typography>
            <Box display='flex' justifyContent='center' gap={1}>
                <Typography fontFamily={'Cookie'} variant="h3">
                    {weatherData.forecast.forecastday[tabValue].astro.sunrise.split(" ")[0]}
                </Typography>
                <Typography sx={{alignSelf:'flex-end', mb:1.5}} variant="subtitle2">
                    {weatherData.forecast.forecastday[tabValue].astro.sunrise.split(" ")[1]}
                </Typography>            
            </Box>
        </Box>

        <Box>
            <Typography gutterBottom variant="subtitle2" component="legend">Sunset</Typography>
            <Box display='flex' justifyContent='center' gap={1}>
                <Typography fontFamily={'Cookie'} variant="h3">
                    {weatherData.forecast.forecastday[tabValue].astro.sunset.split(" ")[0]}
                </Typography>
                <Typography sx={{alignSelf:'flex-end', mb:1.5}} variant="subtitle2">
                    {weatherData.forecast.forecastday[tabValue].astro.sunset.split(" ")[1]}
                </Typography>            
            </Box>
        </Box>
    </Box>
    </CardContent>

</Card>
    )
}
export default WeatherCard;