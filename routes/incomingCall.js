const express = require("express");
const TwilioService = require("../client.service");
const router = express.Router();
//https://1517-2405-201-a808-581a-5462-709c-3dd2-a28d.ngrok-free.app/api/webhook-handler/twilio/ivr-menu?phoneNumber=+919435355529
router.post("/", (req, res) => {
  try {
    const query = req.query;
    const body = req.body;
    console.log("body:", body);
    const phoneNumber = `+${query.phoneNumber.trim()}`;
    console.log("phoneNumber:", phoneNumber);
    const twilioNumber = body.CalledVia;
    const twilioService = new TwilioService();
    const twiml = twilioService.voiceResponseInstance();
    const dial = twiml.dial({
      action: `${process.env.BACKEND_URL}/call_complete`,
      timeout: 30,
      callerId: "+14155552671",
    });
    dial.number(
      {
        statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
        statusCallback: `${process.env.BACKEND_URL}/call_status`,
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
