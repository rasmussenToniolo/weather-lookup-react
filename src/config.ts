
export const TIMEOUT_SEC = 10;
// export const REQUEST_SEC = 5;

const WEATHER_API_KEY = "452c31c0fcfc6e7033ad496dfeadd7d9";
export const WEATHER_API_URL = (coords: any) =>
  `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&appid=${WEATHER_API_KEY}`;

export const LOCATION_API_URL = (coords: any) =>
  `https://geocode.xyz/${coords.lat},${coords.lng}?geoit=json`;

export const COUNTRY_API_URL = (code: string) =>
  `https://restcountries.eu/rest/v2/alpha/${code}`;

const GEO_API_KEY = "bd123992c7ba49ef9f58de376d862487";
export const DATE_TIME_API_URL = (timezone: string) =>
  `https://api.ipgeolocation.io/timezone?apiKey=${GEO_API_KEY}&tz=${timezone}`;