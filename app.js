import getAlertByTime from './db';
import getWeather from './weather';
import Sender from './clients/sender';

const main = setInterval(() => {
  getAlertByTime().then((alerts) => {
    // Alerts at this time
    if (alerts.Count > 0) {
      // Work with each alert
      alerts.Items.forEach((item) => {
        const location = item.location;

        // Get the weather for the items location
        getWeather(location.latitude, location.longitude).then((data) => {
          const sendOptions = {};
          // Set options for sending types
          if (item.email) {
            sendOptions.email = item.email;
          }
          // Send notifications
          const sender = new Sender(sendOptions, data);
          sender.send().then((res) => {
            console.log(`Response from sender ${JSON.stringify(res)}`);
          }).catch((err) => {
            console.log(`Response from sender ${err}`);
          });
        }).catch((err) => {
          console.log(err);
        });
      });
    }
  }).catch((err) => {
    console.log(err);
  });
}, 5 * 1000);

