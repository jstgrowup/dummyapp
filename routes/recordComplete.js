const express = require("express");
const TwilioService = require("../client.service");
const router = express.Router();
router.post("/", (req, res) => {
  const body = req.body;
  const recordingUrl = body.RecordingUrl;
  console.log("recordingUrl:", recordingUrl);
  const twilioService = new TwilioService();
  const twiml = twilioService.voiceResponseInstance();
  twiml.say({ voice: "alice" }, "Thank you for your message. Goodbye.");
  twiml.hangup();
  res.type("text/xml");
  res.send(twiml.toString());
});

module.exports = router;
