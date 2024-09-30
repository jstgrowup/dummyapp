const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const body = req.body;
    console.log("body:call status", body);
    res.type("text/xml");
  } catch (error) {
    console.log("error:call status", error);
  }
});

module.exports = router;
