import DarkSky from 'forecast.io';

const config = {
  APIKey: process.env.DARKSKY_API_KEY,
  timeout: 1000,
};
const darksky = new DarkSky(config);

const getWeather = function getWeather(latitude, longitude, hourly = false) {
  return new Promise((resolve, reject) => {
    let options = {
      exclude: 'minutely,hourly,daily,flags,alerts',
    };
    // Reduces data from api call
    if (!hourly) {
      options = {
        exclude: 'minutely,daily,flags,alerts',
      };
    }

    darksky.get(latitude, longitude, options, (err, res, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

export default getWeather;
