const express = require("express");
const TwilioService = require("../client.service");
const router = express.Router();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNTSID,
  process.env.TWILIO_AUTHTOKEN
);
router.post("/", (req, res) => {
  try {
    const query = req.query;
    const body = req.body;
    const phoneNumber = `+${query.phoneNumber.trim()}`;
    const twilioNumber = body.Called;
    const twilioService = new TwilioService();
    const twiml = twilioService.voiceResponseInstance();
    // const dial = twiml.dial();
    // dial.conference("ConferenceRoom", {
    //   startConferenceOnEnter: true,
    //   endConferenceOnExit: false,
    //   waitUrl:
    //     "http://twimlets.com/holdmusic?Bucket=com.twilio.music.classical",
    // });
    // client.calls
    //   .create({
    //     url: `${process.env.BACKEND_URL}/join_conference`,
    //     to: phoneNumber,
    //     from: twilioNumber,
    //     statusCallback: `${process.env.BACKEND_URL}/call_status`,
    //     statusCallbackEvent: ["initiated", "ringing", "answered", "completed"],
    //     statusCallbackMethod: "POST",
    //   })
    //   .then((call) => console.log("call sid", call.sid));
    const dial = twiml.dial({
      action: `${process.env.BACKEND_URL}/call_complete`,
      timeout: 10,
      callerId: twilioNumber,
      answerOnBridge: true,
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
// const dial = twiml.dial({
//   action: `${process.env.BACKEND_URL}/call_complete`,
//   timeout: 10,
//   callerId: twilioNumber,
// });
// dial.number(
//   {
//     statusCallbackEvent: [
//       "no-answer",
//       "busy",
//       "initiated",
//       "ringing",
//       "answered",
//       "completed",
//       "failed",
//       "canceled",
//     ],
//     statusCallback: `${process.env.BACKEND_URL}/call_status`,
//     statusCallbackMethod: "POST",
//   },
//   phoneNumber
// );
