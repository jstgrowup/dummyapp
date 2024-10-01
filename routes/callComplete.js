const express = require("express");
const TwilioService = require("../client.service");
const router = express.Router();

router.post("/", (req, res) => {
  try {
    // const twilioService = new TwilioService();
    // const twiml = twilioService.voiceResponseInstance();
    // const body = req.body;
    // const callStatus = body.DialCallStatus;
    // if (callStatus === "no-answer" || callStatus === "failed") {
    //   twiml.say(
    //     { voice: "alice" },
    //     "The call was not answered. You can leave a voicemail after the beep."
    //   );
    //   twiml.record({ action: `${process.env.BACKEND_URL}/record_complete` });
    // } else {
    //   twiml.say({ voice: "alice" }, "The call has ended. Goodbye.");
    //   twiml.hangup();
    // }
    // const gather = twiml.gather({
    //   numDigits: 1,
    //   timeout: 10,
    //   action: `${process.env.BACKEND_URL}/gather_result`,
    // });
    // gather.say(
    //   { voice: "alice" },
    //   "Press 1 to record a voice mail and 2 to reject the call;"
    // );

    res.type("text/xml");
    res.send(twiml.toString());
  } catch (error) {
    console.log("error:call complete", error);
  }
});

module.exports = router;
