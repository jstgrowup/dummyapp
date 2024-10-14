const express = require("express");
const TwilioService = require("../client.service");
const router = express.Router();
router.post("/", (req, res) => {
  console.log("body: join conference");
  console.log("join conference ");
  const twilioService = new TwilioService();
  const twiml = twilioService.voiceResponseInstance();
  const dial = twiml.dial();
  dial.conference("ConferenceRoom");

  res.type("text/xml");
  res.send(twiml.toString());
});

module.exports = router;
