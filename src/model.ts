import { LatLng } from "leaflet";
import { COUNTRY_API_URL, DATE_TIME_API_URL, LOCATION_API_URL, WEATHER_API_URL } from "./config";
import { getJSON } from "./helpers";

export async function fetchData(coords: LatLng) {

  try {
    const weatherData = await getWeatherData(coords);

    const locationData = await getLocationData(coords);

    const countryData = await getCountryData(locationData.code);

    const dateData = await getDateTimeData(weatherData.timezone);

  
    return {weatherData, locationData, countryData, dateData};
  } catch(err) {
    throw err;
  }

}

export async function fetchDataCity(city: string) {
  try {
    const geoJSON = await getJSON(`https://geocode.xyz/${city}?json=1`);

    const coords = {lat: +geoJSON.latt, lng: +geoJSON.longt};

    const weatherData = await getWeatherData(coords);

    const locationData = await getLocationData(coords);

    const countryData = await getCountryData(locationData.code);

    const dateData = await getDateTimeData(weatherData.timezone);

  
    return {weatherData, locationData, countryData, dateData};
  } catch(err) {
    throw err;
  }
}

export async function getWeatherData(coords: any) {
  const url = WEATHER_API_URL(coords);
  const weatherData = await getJSON(url);
  // .timezone, .current.weather[0].description, .current.temp, .daily[0].temp.max/min, .current.wind_speed, .daily[0].wind_gust, .current.wind_deg, .current.dt, .current.sunrise, .current.sunset

  const weatherObj = {
    timezone: weatherData.timezone,
    description: weatherData.current.weather[0].description,
    currentTemp: Math.round(weatherData.current.temp - 273).toFixed(),
    currentDecimal: (weatherData.current.temp - 273).toFixed(1).slice(-1),
    maxTemp: Math.ceil(weatherData.daily[0].temp.max - 273).toFixed(),
    minTemp: Math.floor(weatherData.daily[0].temp.min - 273).toFixed(),
    windSpeed: Math.round(weatherData.current.wind_speed * 3.6 * 10) / 10,
    windGust: Math.round(weatherData.daily[0].wind_gust * 3.6 * 10) / 10,
    windDeg: weatherData.current.wind_deg,
    currentTime: weatherData.current.dt,
    sunriseTime: weatherData.current.sunrise,
    sunsetTime: weatherData.current.sunset,
    units: {
      temp: "c",
      speed: "KM/H",
    },
    weatherConditions: weatherData.current.weather[0],
    dailyData: weatherData.daily,
  };

  return weatherObj;
}

export async function getLocationData(coords: any) {
  const url = LOCATION_API_URL(coords);
  const locationData = await getJSON(url);
  // .city, .prov

  const locationObj = {
    city: locationData.city.toLowerCase(),
    code: locationData.prov,
    lat: +locationData.latt,
    lng: +locationData.longt,
  };
  return locationObj;
}

export async function getCountryData(code: string) {
  const url = COUNTRY_API_URL(code);
  const countryData = await getJSON(url);
  // .name, .flag

  const countryObj = {
    name: countryData.name,
    flag: countryData.flag,
  };
  return countryObj;
}

export async function getDateTimeData(timezone: string) {
  const url = DATE_TIME_API_URL(timezone);
  const dateTimeData = await getJSON(url);
  // .date_time,

  const dateTimeObj = {
    dateTime: dateTimeData.date_time,
  };
  return dateTimeObj;
}

export function setLocalStorage(bookmarks: any[]) {
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

export function getLocalStorage() {
  return localStorage.getItem('bookmarks');
}
