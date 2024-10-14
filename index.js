const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const callCompleteRoute = require("./routes/callComplete");
const whisperRoute = require("./routes/whisper");
const gatherResultRoute = require("./routes/gatherResult");
const recordCompleteRoute = require("./routes/recordComplete");
const incomingCallRoute = require("./routes/incomingCall");
const callStatusRoute = require("./routes/callStatus");
const joinConferenceRoute = require("./routes/join-conference");

const app = express();
const port = process.env.PORT || 3000;
console.log("port:", port);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/incoming_call", incomingCallRoute);
app.use("/call_complete", callCompleteRoute);
app.use("/whisper", whisperRoute);
app.use("/gather_result", gatherResultRoute);
app.use("/record_complete", recordCompleteRoute);
app.use("/call_status", callStatusRoute);
app.use("/join_conference", joinConferenceRoute);

app.listen(port, () => {
  console.log(`Twilio Express App running on port ${port}`);
});
