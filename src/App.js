import './App.css';
import React, { useState, useEffect } from 'react';
// import data from './DATA.json';

function App() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState(null);
  const temperature = []

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

  function formatDate(date){
    const options = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true}
    return new Date(date).toLocaleString(undefined, options)
  }
  
  // if(data){.forEach((element) => 
  //   temperature.push(`<p>${formatDate(new Date(element.dt * 1000))}</p>` + 
  //   `<p> ${element.main.temp}°F  </p>` +
  //   `<img src={https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png}></img>`))
  // }

  return (
    <div>
      {data ? (
        <>
          {data.list.map((element) => (
            <div style={{display: 'inline-block', border: '1px solid'}}>
              <p>{formatDate(new Date(element.dt * 1000))}</p>
              <p> {element.main.temp}°F  </p>
              <img width="50" src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}></img>
            </div>
            ))}
        </>) : (<p>Loading...</p>)}
    </div>
  );
}

export default App;