import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
        {
            params: {
              bl_latitude: sw.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
              tr_latitude: ne.lat,
            },
            headers: {
              'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          }); 

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherData = async (coords) => {
  try {
    const forecastData = await axios.get('https://weatherapi-com.p.rapidapi.com/forecast.json', {
      params: { q: `${coords.lat},${coords.lng}`, days: '3' },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
      }
    });

    return  forecastData.data;
  } catch (error) {
    console.log(error);
  }
};



