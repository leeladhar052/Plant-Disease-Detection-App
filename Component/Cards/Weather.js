import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location'
import { API_KEY } from '../../utils/Weather'
import axios from 'axios';
import { translate } from '@vitalets/google-translate-api';
// import { HttpProxyAgent } from 'http-proxy-agent';



const Weather = () => {

  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [errorMsg, setErrorMsg] = useState(null);
  // const agent = new HttpProxyAgent('http://103.152.112.162:80');


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  const latitude = 30.96; // Replace with your actual latitude
  const longitude = 76.46; // Replace with your actual longitude

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`
        );
        setWeatherData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching weather data', error);
      }

      try {
        // const { text } = await translate('How are you. Where are you going. ', { to: 'hi' });
        // console.log(text) // => 'Hello World! How are you?'
      } catch (error){
        console.error('Error in getting translation', error);

      }

    };

    fetchData();
  }, [latitude, longitude]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Current Weather: {weatherData ? weatherData.current.temp_c : '25'} °C in {weatherData ? weatherData.location.name : 'India'},
        {weatherData ? weatherData.current.condition.text : '25'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default Weather;