// index.js
// where your node app starts

// init project
var express = require("express");
var moment = require("moment");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:time", function (req, res) {
  let time = req.params.time;
  if (moment(time, "YYYY-MM-DD", true).isValid()) {
    res.json({
      unix: moment(time).valueOf(),
      utc: moment(time).utc().format("ddd, DD MMM YYYY HH:mm:ss [GMT]"),
    });
  } else if (moment(time, "X", true).isValid()) {
    res.json({
      unix: time,
      utc: moment.unix(time).utc().format("ddd, DD MMM YYYY HH:mm:ss [GMT]"),
    });
  } else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
