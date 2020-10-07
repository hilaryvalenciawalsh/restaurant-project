//all npm install

//backend
//setup an express server
//make sure to include data parse
//Port special heroku thingyyy PORT = process.env.PORT || 3000

//making handle requests
//routes:
//get index.html with /
//get reserve.html with /reserve
//get tables.thlm with /tables

//post handled from /reserve to add data to JSON
//

// Dependencies
// =============================================================
var express = require("express");
const { get } = require("http");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Table Arrays
// =============================================================
var tableArr = [
//   {
//     name: ,
//     phone: "Yoda",
//     email: "Jedi Master",
//     uniqueId: 900,
//   },
];

var waitListArr = [
//   {
//     name: "Anakin",
//     phone: "Yoda",
//     email: "Jedi Master",
//     uniqueId: 900,
//   },
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/reserve", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
// Create reservation
app.post("/reserve", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newTableObj = req.body;
//   console.log(newTableObj);

  if(tableArr.length<5){
      tableArr.push(newTableObj)
      console.log(tableArr)
  } else {
      waitListArr.push(newTableObj)
      console.log(waitListArr)
  }
  res.json(newTableObj);
});

app.get("/api/tables", function (req, res) {
    res.json(tableArr)
})

app.get("/api/waitList", function (req, res) {
    res.json(waitListArr)
})

app.get("/api/clear", function (req, res) {
    tableArr = []
    waitListArr = []
    res.send("DELETED!!!")
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
