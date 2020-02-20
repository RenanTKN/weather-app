import React, { useState } from "react";

import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "./app_component/form.component";
import Footer from "./app_component/footer.component";
import Weather from "./app_component/weather.component";

// api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "a0f351c7b035d318367908f07d760ca3";
const HTTP_STATUS_OK = 200;

function App() {
  const [city, setCity] = useState(undefined);
  const [country, setCountry] = useState(undefined);
  const [icon, setIcon] = useState(undefined);
  const [celsius, setCelsius] = useState(undefined);
  const [tempMax, setTempMax] = useState(undefined);
  const [tempMin, setTempMin] = useState(undefined);
  const [description, setDescription] = useState("");
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const weatherIcon = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };

  function calcCelsius(temp) {
    let celsius = Math.floor(temp - 273.15);
    return celsius;
  }

  function getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        setIcon(weatherIcon.Thunderstorm);
        break;
      case rangeId >= 300 && rangeId <= 331:
        setIcon(weatherIcon.Drizzle);
        break;
      case rangeId >= 500 && rangeId <= 531:
        setIcon(weatherIcon.Rain);
        break;
      case rangeId >= 600 && rangeId <= 622:
        setIcon(weatherIcon.Snow);
        break;
      case rangeId >= 701 && rangeId <= 781:
        setIcon(weatherIcon.Atmosphere);
        break;
      case rangeId === 800:
        setIcon(weatherIcon.Clear);
        break;
      case rangeId >= 801 && rangeId <= 804:
      default:
        setIcon(weatherIcon.Clouds);
        break;
    }
  }

  const getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city) {
      setLoading(true);
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );

      const response = await api_call.json();

      console.log(response);

      if (response.cod === HTTP_STATUS_OK) {
        setLoading(false);
        setCity(`${response.name}, ${response.sys.country}`);
        setCelsius(calcCelsius(response.main.temp));
        setTempMax(calcCelsius(response.main.temp_max));
        setTempMin(calcCelsius(response.main.temp_min));
        setDescription(response.weather[0].description);
        setError(false);
        setNotFound(false);
        getWeatherIcon(weatherIcon, response.weather[0].id);
      } else {
        setNotFound(true);
        setLoading(false);
      }
    } else {
      setError(true);
    }
  };

  return (
    <div className="App">
      <Form loadWeather={getWeather} error={error} />
      <Weather
        city={city}
        country={country}
        tempCelsius={celsius}
        tempMax={tempMax}
        tempMin={tempMin}
        description={description}
        weatherIcon={icon}
        loading={loading}
        notFound={notFound}
      />
      <Footer />
    </div>
  );
}

export default App;
