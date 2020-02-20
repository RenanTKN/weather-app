import React from "react";

import "weather-icons/css/weather-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Form from "./app_component/form.component";
import Footer from "./app_component/footer.component";
import Weather from "./app_component/weather.component";

// api call api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "a0f351c7b035d318367908f07d760ca3";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celcius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false
    };

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calcCelsius(temp) {
    let celsius = Math.floor(temp - 273.15);
    return celsius;
  }

  getWeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({ icon: this.weatherIcon.Thunderstorm });
        break;
      case rangeId >= 300 && rangeId <= 331:
        this.setState({ icon: this.weatherIcon.Drizzle });
        break;
      case rangeId >= 500 && rangeId <= 531:
        this.setState({ icon: this.weatherIcon.Rain });
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: this.weatherIcon.Snow });
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: this.weatherIcon.Atmosphere });
        break;
      case rangeId === 800:
        this.setState({ icon: this.weatherIcon.Clear });
        break;
      case rangeId >= 801 && rangeId <= 804:
      default:
        this.setState({ icon: this.weatherIcon.Clouds });
        break;
    }
  }

  getWeather = async e => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if (city) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
      );

      const response = await api_call.json();

      console.log(response);

      if (response.sys) {
        this.setState({
          city: `${response.name}, ${response.sys.country}`,
          celsius: this.calcCelsius(response.main.temp),
          temp_max: this.calcCelsius(response.main.temp_max),
          temp_min: this.calcCelsius(response.main.temp_min),
          description: response.weather[0].description,
          error: false
        });
        this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
      }
    } else {
      this.setState({ error: true });
    }
  };

  render() {
    return (
      <div className="App">
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <Weather
          city={this.state.city}
          country={this.state.country}
          temp_celsius={this.state.celsius}
          temp_max={this.state.temp_max}
          temp_min={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
