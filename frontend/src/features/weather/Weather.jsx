import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Status,
  errorMessageSelector,
  statusSelector,
  cityNameSelector,
  currentTempSelector,
  currentUVISelector,
  forecastDataListSelector,
  fetchWeatherData,
} from './weatherSlice';
import WeatherHeader from './WeatherHeader';
import WeatherCard from './WeatherCard'
import styles from './Weather.module.css';
import Loading from './icons/loading.svg'

export default function Weather() {
  const [zipCode, setZipCode] = useState('');

  const dispatch = useDispatch();
  const status = useSelector(statusSelector);
  const errorMessage = useSelector(errorMessageSelector);
  const forecast = useSelector(forecastDataListSelector);
  const cityName = useSelector(cityNameSelector);
  const currentTemp = useSelector(currentTempSelector);
  const currentUvi = useSelector(currentUVISelector);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(fetchWeatherData(zipCode));
  };

  const handleKeypress = (event) => {
    // pressing the enter key
    if (event.code === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Place zipcode"
          placeholder="ZIP code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          onKeyPress={handleKeypress}
        />
        <button
          className={styles.button}
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>

      {status === Status.Loading && (
        <img className={styles.icon} src={Loading} alt={`Loading...`} />
      )}

      {status === Status.Failed && (
        <div className={styles.error}>{errorMessage}</div>
      )}

      {status === Status.Idle && (
        <>
          {cityName && (
            <WeatherHeader
              cityName={cityName}
              temp={currentTemp}
              uvi={currentUvi}
            />
          )}
          {forecast && forecast.map((weather, index) => (
            <WeatherCard
              key={index}
              timestamp={weather.dt}
              temp_max={weather.main.temp_max}
              temp_min={weather.main.temp_min}
              description={weather.weather[0].description}
              icon={weather.weather[0].icon}
            />
          ))}
        </>
      )}
    </div>
  );
}
