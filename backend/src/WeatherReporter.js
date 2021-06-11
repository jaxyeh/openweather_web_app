const fetch = require('node-fetch');
const ZipcodeToGeolocation = require('./ZipcodeToGeolocation')

const apiKey = process.env.OPENWEATHER_API_KEY;

export async function fetchWeatherForecast(lat, lon) {
  /* istanbul ignore next */
  console.log(`Fetching OpenWeatherMap Forecast data for ${lat}, ${lon}`);
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?units=imperial&lat=${lat}&lon=${lon}&appid=${apiKey}`);
}

export async function fetchWeatherCurrent(lat, lon) {
  // NOTE: As of 1st April 2021, the UV Data API is deprecated and is now part of One Call API
  /* istanbul ignore next */
  console.log(`Fetching OpenWeatherMap OneCall data for ${lat}, ${lon}`);
  return fetch(`https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${apiKey}`);
}

export async function getWeatherForecast(zipcode) {
  let geoLocation = await ZipcodeToGeolocation(zipcode);
  if (!geoLocation) {
    throw `Unable to find Geolocation for this Zipcode: ${zipcode}!`;
  }
  const res = await fetchWeatherForecast(geoLocation[0], geoLocation[1]);
  if (res.status !== 200) {
    // TODO: Transmit error to Logger Service
    // console.error(res.error);
    throw `Unable to retrieve weather forecast for ${zipcode}`;
  }
  return res.json();
}

export async function getWeatherCurrent(zipcode) {
  let geoLocation = await ZipcodeToGeolocation(zipcode);
  if (!geoLocation) {
    throw `Unable to find Geolocation for this Zipcode: ${zipcode}!`;
  }
  const res = await fetchWeatherCurrent(geoLocation[0], geoLocation[1]);
  if (res.status !== 200) {
    // TODO: Transmit error to Logger Service
    // console.error(res.error);
    throw `Unable to retrieve current weather for ${zipcode}`;
  }
  return res.json();
}

module.exports = {
  fetchWeatherForecast,
  fetchWeatherCurrent,
  getWeatherForecast,
  getWeatherCurrent,
}
