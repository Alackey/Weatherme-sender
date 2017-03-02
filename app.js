import getAlertByTime from './db';
import getWeather from './weather';

const main = setInterval(() => {
  console.log('hello');
  getAlertByTime().then((alerts) => {
    console.log(alerts);
    if (alerts.count > 0) {
      console.log('send email');
    }

    // TODO: Change to alerts long/lat
    getWeather(34.0368528, -117.7666566).then((data) => {
      console.log(data);
    });
  }).catch((err) => {
    console.log(err);
  });
}, 5 * 1000);

