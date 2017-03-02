import getAlertByTime from './db';
import getWeather from './weather';

const main = setInterval(() => {
  console.log('hello');
  getAlertByTime().then((alerts) => {
    // Alerts at this time
    if (alerts.Count > 0) {
      console.log('send email');

      // Work with each alert
      alerts.Items.forEach((item) => {
        console.log(item);
        const location = item.location;

        // Get the weather for the items location
        getWeather(location.latitude, location.longitude).then((data) => {
          console.log(data);
        }).catch((err) => {
          console.log(err);
        });
      });
    }
  }).catch((err) => {
    console.log(err);
  });
}, 5 * 1000);

