const express = require("express");
const TwilioService = require("../client.service");
const router = express.Router();
router.post("/", (req, res) => {
  const digits = req.body.Digits;
  const twilioService = new TwilioService();
  const twiml = twilioService.voiceResponseInstance();
  switch (digits) {
    case "1":
      twiml.say({ voice: "alice" }, "Please leave a voice mail after the beep");
      twiml.record({ action: "/record_complete" });
      res.type("text/xml");
      return res.send(twiml.toString());

    case "2":
      twiml.hangup();
      res.type("text/xml");
      return res.send(twiml.toString());
  }

  res.type("text/xml");
  res.send(twiml.toString());
});

module.exports = router;
