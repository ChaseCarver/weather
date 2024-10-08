import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [currentData, setCurrentData] = useState(null);
  const [futureData, setFutureData] = useState(null)
  const [city, setCity] = useState(null)
  const [location, setLocation] = useState(null);

  

  useEffect(() => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        (position) => {setLocation([position.coords.latitude, position.coords.longitude, position]);
      console.log(`Location received: ${position.coords.latitude, position.coords.longitude}`)}
    )}
  }, []);
  

  useEffect(() => {
    if(location){
    const [lat, lon] = location
    const apiKey = "42d6bde5f66700148deb5a2f62801b36"
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    const forecastApi = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    const cityNameApi = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${apiKey}`
    
    fetch(forecastApi)
      .then(response => response.json())
      .then(data => {console.log("Fetching data from API:", forecastApi); setFutureData(data)})
      .catch(error => console.error("Fetch error:", error));

    fetch(api)
      .then(response => response.json())
      .then(data => {console.log("Fetching data from API:", api); setCurrentData(data)})
      .catch(error => console.error("Fetch error:", error));

    fetch(cityNameApi)
      .then(response => response.json())
      .then(data => {console.log("Fetching data from API:", cityNameApi); setCity(data)})
      .catch(error => console.error("Fetch error:", error));

    }
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

  return (
    <>
      <>{location ? (<></>) : (<p>Please show location...</p>)}</>
      <div>
        {currentData ? (
        <>
          <div className="border-y-2 h-screen w-full">
            <div className="justify-between flex flex-row text-4xl items-center absolute w-full">
              {city ? (<><p className="flex flex-row items-center left-0"><img  src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`}></img>{city[0].name + ", " + city[0].state}</p> </>) : (<>loading...</>)}
              <p className="right-0">{formatDate(new Date(currentData.dt * 1000))}</p>
            </div>
            <div className="flex flex-row w-full h-full justify-center items-center">
              <p className="text-8xl "> {currentData.main.temp}°F</p>
            </div>
          </div>
        </>) : (<p>Loading...</p>)}
      </div>
      <div>
        {futureData ? (
          <>
            {futureData.list.map((element) => (
              <div className="flex flex-row text-4xl py-10 border-y-2 justify-center">
                <p>{formatDate(new Date(element.dt * 1000))}&nbsp;</p>
                <p> {element.main.temp}°F  </p>
                <img width="50" src={`https://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}></img>
              </div>
              ))}
          </>) : (<p>Loading...</p>)}
      </div>
    </>
  );
}

export default App;