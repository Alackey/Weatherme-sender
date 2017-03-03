import sendEmail from './email';

class Sender {
  constructor(options, weather) {
    this.options = options;
    this.weather = weather;
  }

  // Sends notification for the weather
  send() {
    if (this.options.email) {
      return sendEmail(this.options.email, this.weather);
    }
    const error = { status: 'error', message: 'email failed' };
    throw error;
  }
}

export default Sender;
