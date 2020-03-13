import React from "react";
import Loading from "./loading.component";

function Weather(props) {
  if (props.loading) {
    return <Loading />;
  } else if (props.notFound) {
    return (
      <div className="text-light weather-data">
        <h1>City not found</h1>
      </div>
    );
  } else {
    return props.city ? (
      <div className="text-light weather-data">
        <h1>{props.city}</h1>
        <h5 className="py-3">
          <i className={`wi ${props.weatherIcon} display-1`}></i>
        </h5>
        {props.tempCelsius ? (
          <h1 className="py-2">{props.tempCelsius}&deg;</h1>
        ) : null}
        {minMaxTemp(props.tempMin, props.tempMax)}
        <h4 className="py-3">{props.description}</h4>
      </div>
    ) : (
      ""
    );
  }
}

function minMaxTemp(min, max) {
  if (min && max) {
    return (
      <h3>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
}

export default Weather;
