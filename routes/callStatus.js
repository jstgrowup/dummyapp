const express = require("express");
const TwilioService = require("../client.service");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const body = req.body;
    const callStatus = body.CallStatus;
    console.log("callStatus: in the call status", callStatus);
    const twilioService = new TwilioService();
    const twiml = twilioService.voiceResponseInstance();
    if (callStatus === "no-answer") {
      const gather = twiml.gather({
        numDigits: 1,
        timeout: 10,
        action: `${process.env.BACKEND_URL}/gather_result`,
      });
      gather.say(
        { voice: "alice" },
        "Press 1 to record a voice mail and 2 to reject the call;"
      );
      res.type("text/xml");
      res.send(twiml.toString());
    }
    res.type("text/xml");
    res.send(twiml.toString());
  } catch (error) {
    console.log("error:call status", error);
  }
});

module.exports = router;
