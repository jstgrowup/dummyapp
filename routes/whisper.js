const express = require("express");

const TwilioService = require("../client.service");
const router = express.Router();

router.post("/", (req, res) => {
  const twilioService = new TwilioService();
  const twiml = twilioService.voiceResponseInstance();
  const gather = twiml.gather({
    numDigits: 1,
    timeout: 10,
    action: `${process.env.BACKEND_URL}/gather_result`,
  });
  gather.say(
    { voice: "alice" },
    "You are receiving a call, press any key to accept."
  );

  twiml.hangup();
  res.type("text/xml");
  res.send(twiml.toString());
});

module.exports = router;
