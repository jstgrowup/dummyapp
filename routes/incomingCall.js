const express = require("express");
const TwilioService = require("../client.service");
const router = express.Router();
router.post("/", (req, res) => {
  try {
    const query = req.query;
    const body = req.body;
    const phoneNumber = `+${query.phoneNumber.trim()}`;
    const twilioNumber = body.Called;
    const twilioService = new TwilioService();
    const twiml = twilioService.voiceResponseInstance();
    const dial = twiml.dial({
      action: `${process.env.BACKEND_URL}/call_complete`,
      timeout: 10,
      callerId: twilioNumber,
    });
    dial.number(
      {
        statusCallbackEvent: [
          "no-answer",
          "busy",
          "initiated",
          "ringing",
          "answered",
          "completed",
          "failed",
          "canceled",
        ],
        statusCallback: `${process.env.BACKEND_URL}/call_status`,
        statusCallbackMethod: "POST",
      },
      phoneNumber
    );
    res.type("text/xml");
    res.send(twiml.toString());
  } catch (error) {
    console.log("error:incoming call", error);
  }
});

module.exports = router;
