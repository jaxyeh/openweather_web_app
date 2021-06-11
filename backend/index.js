require('dotenv').config()
const express = require('express');
const cors = require('cors')
const app = express();

// Example with/without cache
// const WeatherReporter = require('./src/WeatherReporter');
const WeatherReporterCache = require('./src/WeatherReporterCache');

const PORT = 8000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('OpenWeather API Server'));

app.get('/forecast', async (req, res) => {
  try {
    // Example to retrieve weather forecast without cache
    // let forecast = await WeatherReporter.getWeatherForecast(req.query.zipcode);

    // Retrieve weather forecast (Cache Wrapper)
    let forecast = await WeatherReporterCache.getWeatherForecast(req.query.zipcode);
    res.json(forecast);

  } catch(error) {
    /* istanbul ignore next */
    console.log(error)
    res.status(500).json({error})
  }
});

app.get('/current', async (req, res) => {
  try {
    // Retrieve current weather (Cache Wrapper)
    let current = await WeatherReporterCache.getWeatherCurrent(req.query.zipcode);
    res.json(current);
  } catch(error) {
    /* istanbul ignore next */
    console.log(error)
    res.status(500).json({error})
  }
});

app.get('/full-report', async (req, res) => {
  try {
    // Retrieve weather forecast (Cache Wrapper)
    let forecast = await WeatherReporterCache.getWeatherForecast(req.query.zipcode);
    // Retrieve current weather (Cache Wrapper)
    let current = await WeatherReporterCache.getWeatherCurrent(req.query.zipcode);
    // Transmit data
    res.json({
      current,
      forecast
    });
  } catch(error) {
    /* istanbul ignore next */
    console.log(error)
    res.status(500).json({error})
  }
});


app.listen(PORT, () => {
  /* istanbul ignore next */
  console.log(`Weather API Server is running at http://localhost:${PORT}`);
});

module.exports = app;
