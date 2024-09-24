import './App.css';
import React, { useState, useEffect } from 'react';
// import data from './DATA.json';

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  
  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {setLocation([position.coords.latitude, position.coords.longitude]);
      console.log(`Location received: ${position.coords.latitude, position.coords.longitude}`)}
    )} 
  }, []);
  

  useEffect(() => {
    if(location){
    const [lat, lon] = location
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=42d6bde5f66700148deb5a2f62801b36`
    const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=42d6bde5f66700148deb5a2f62801b36`
    fetch(api)
      .then(response => response.json())
      .then(data => {console.log("Data received:", data); setData(data)})
      .catch(error => console.error("Fetch error:", error));
      console.log("Fetching data from API:", api)
    fetch()
      .then(response => response.json())
      .then(data => {console.log("Data received:", data);})
      .catch(error => console.error("Fetch error:", error));
      console.log("Fetching data from API:")}
  }, [location])

  

  function kToFh(data){
    return Math.round((((data - 273.15) * 9/5 + 32) * 100) / 100)
  }

  return (
    <div>
      {data ? (
        <>
          <p>High Temperature Is: {kToFh(data.main.temp_max)}</p>
          <p>Low Temperature Is: {kToFh(data.main.temp_min)}</p>
          <p>Current Temperature Is: {kToFh(data.main.temp)}</p>
          <p>Current Weather Is: {data.weather[0].main}, {data.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}></img>
        </>) : (<p>Loading...</p>)}
    </div>
  );
}

export default App;