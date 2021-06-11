const WeatherReporter = require('./WeatherReporter');

const forecastWeatherCache = new Map();
const currentWeatherCache = new Map();

const EXPIRATION_TIMEOUT = 60 * 60000; // 60 minutes

export async function getWeatherForecast(zipcode) {
  if (forecastWeatherCache.has(zipcode)) {
    const forecastReportObj = forecastWeatherCache.get(zipcode);
    if (Date.now() - forecastReportObj.lastModified <= EXPIRATION_TIMEOUT) {
      return forecastReportObj.data;
    }
  }
  // Otherwise, fetch data and store into cache
  try {
    let forecast = await WeatherReporter.getWeatherForecast(zipcode);
    if (forecast) {
      forecastWeatherCache.set(zipcode, {data: forecast, lastModified: Date.now()});
    }
    return forecast;
  } catch (err) {
    throw err;
  }
}

export async function getWeatherCurrent(zipcode) {
  if (currentWeatherCache.has(zipcode)) {
    const currentReportObj = currentWeatherCache.get(zipcode);
    if (Date.now() - currentReportObj.lastModified <= EXPIRATION_TIMEOUT) {
      return currentReportObj.data;
    }
  }
  // Otherwise, fetch data and store into cache
  try {
    let current = await WeatherReporter.getWeatherCurrent(zipcode);
    if (current) {
      currentWeatherCache.set(zipcode, {data: current, lastModified: Date.now()});
    }
    return current
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getWeatherForecast,
  getWeatherCurrent,
}
