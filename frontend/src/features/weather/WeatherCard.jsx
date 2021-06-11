import React from 'react';
import PropTypes from 'prop-types'
import { DateTime } from "luxon";

import WeatherIcon from './WeatherIcon';

import styles from './WeatherCard.module.css';

function WeatherCard({
  timestamp,
  temp_max,
  temp_min,
  description,
  icon
}) {
  const date = DateTime.fromSeconds(timestamp);
  const shortDateString = date.toFormat('EEEE');
  const timeString = date.toFormat('h:mm a');

  const max = Math.round(temp_max)
  const min = Math.round(temp_min)

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <h2 className={styles.date}>
          <span className={styles.dateweek}>{shortDateString}</span>
          <span className={styles.dateday}>{timeString}</span>
        </h2>
        <WeatherIcon icon={icon} description={description} />
        <div className={styles.temp}>
          <span className={styles.high}>{max}°</span>
          <span className={styles.low}>/{min}°</span>
        </div>
      </div>
      <div className={styles.description}>
        {description}
      </div>
    </div>
  );
}

WeatherCard.propTypes = {
  timestamp: PropTypes.number,
  temp_max: PropTypes.number,
  temp_min: PropTypes.number,
  description: PropTypes.string,
  icon: PropTypes.string,
}

export default WeatherCard
