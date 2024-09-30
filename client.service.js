const Twilio = require("twilio");
const VoiceResponse = Twilio.twiml.VoiceResponse;
const MessagingResponse = Twilio.twiml.MessagingResponse;

const client = new Twilio(
  process.env.TWILIO_ACCOUNTSID,
  process.env.TWILIO_AUTHTOKEN
);

class TwilioService {
  constructor() {
    this.twilioClient = client;
  }

  voiceResponseInstance() {
    return new VoiceResponse();
  }

  messagingResponseInstance() {
    return new MessagingResponse();
  }
}

module.exports = TwilioService;
