import React from 'react';
import PropTypes from 'prop-types'

import styles from './WeatherHeader.module.css';

function WeatherHeader({ cityName, temp, uvi }) {
  return (
    <div className={styles.header}>
      <div className={styles.city}>{cityName}</div>
      <div className={styles.temp}>{Math.floor(temp)}°</div>
      <div className={styles.uvi}>UV Index: {uvi}</div>
      {/* <h7>{currentDateString}</h7> */}
    </div>
  );
}

WeatherHeader.propTypes = {
  cityName: PropTypes.string,
  temp: PropTypes.number,
  uvi: PropTypes.number,
}

export default WeatherHeader
