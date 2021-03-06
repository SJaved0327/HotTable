// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// (DATA)
// =============================================================

//CURRENT RESERVATIONS
var tables = [];

//WAITING LIST
var waitlist = [];

// Routes
// =============================================================

//==== HOME PAGE ====//

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//==== TABLES PAGE ====//

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));

});

app.get("/api/tables", function(req, res) {
  res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
  res.json(waitlist);
});

//POPULATE CURRENT RESERVATIONS


//==== RESERVATION PAGE ====//

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));

});



// CREATES NEW RESERVATION
app.post("/api/new", function(req, res) {

  var newReservation = req.body;

  console.log("----- NEW RESERVATION -----");
  console.log(newReservation);

  if (tables.length < 5) {

    tables.push(newReservation);

  } else {

    waitlist.push(newReservation);

  }

  res.json(waitlist);

  CheckArrays();

});

function CheckArrays (){

  console.log("----- TABLES -----");
  for (var i = 0; i < tables.length; i++){
    console.log(`${[i+1]}: ID - ${tables[i].uniqueID}`);
  };

  console.log("----- WAITLIST -----");
  for (var j = 0; j < waitlist.length; j++){
    console.log(`${[j+1]}: ID - ${waitlist[j].uniqueID}`);
  };

};

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});