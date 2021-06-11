import React from 'react';

import styles from './WeatherCard.module.css';

import iconClear from './icons/art_clear.png';
import iconClouds from './icons/art_clouds.png';
import iconFog from './icons/art_fog.png';
import iconLightClouds from './icons/art_light_clouds.png';
import iconLightRain from './icons/art_light_rain.png';
import iconRain from './icons/art_rain.png';
import iconSnow from './icons/art_snow.png';
import iconStorm from './icons/art_storm.png';

const iconMap = {
	"01d": iconClear,
	"02d": iconLightClouds,
	"03d": iconClouds,
	"04d": iconClouds,
	"09d": iconRain,
	"10d": iconLightRain,
	"11d": iconStorm,
	"13d": iconSnow,
	"50d": iconFog,
	"01n": iconClear,
	"02n": iconLightClouds,
	"03n": iconClouds,
	"04n": iconClouds,
	"09n": iconRain,
	"10n": iconLightRain,
	"11n": iconStorm,
	"13n": iconSnow,
	"50n": iconFog
};

function iconMapper(icon) {
  return iconMap[icon]
}

export default function WeatherIcon({ icon, description }) {
  return (
    <img className={styles.icon} src={iconMapper(icon)} alt={`Icon of ${description}`} />
  );
}
