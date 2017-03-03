import Mailgun from 'mailgun-js';

const apiKey = process.env.MAILGUN_API_KEY;
const domain = 'sandboxa3e9d68273cc4dc7b0cb032e5d3ac7d9.mailgun.org';

const mailgun = new Mailgun({ apiKey, domain });

/* Send email to provided email address */
const sendEmail = function sendEmail(email, weather) {
  return new Promise((resolve, reject) => {
    const data = {
      from: 'Excited User <me@samples.mailgun.org>',
      to: email,
      subject: 'Weather for today - Weatherme',
      text: JSON.stringify(weather),
    };

    // Send email
    mailgun.messages().send(data, (err, body) => {
      if (err) reject(err);
      resolve(body);
    });
  });
};

export default sendEmail;
