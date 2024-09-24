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
    const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=42d6bde5f66700148deb5a2f62801b36&units=imperial`
    fetch(forecastApi)
      .then(response => response.json())
      .then(data => {console.log("Data received:", data); setData(data)})
      .catch(error => console.error("Fetch error:", error));
      console.log("Fetching data from API:", forecastApi)}
  }, [location])
  

  function kToFh(data){
    return Math.round((((data - 273.15) * 9/5 + 32) * 100) / 100)
  }

  return (
    <div>
      {data ? (
        <>
          <p>Time: {new Date(data.list[1].dt * 1000).toString()}</p>
          <p>Current Temperature Is: {data.list[0].main.temp}</p>
          <p>Current Weather Is: {data.list[0].weather[0].main}, {data.list[0].weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}></img>
          <p>Length of list: {data.list.length}</p>
        </>) : (<p>Loading...</p>)}
    </div>
  );
}

export default App;