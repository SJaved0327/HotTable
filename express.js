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

//reservation constructor
var reservation = (name, phone, email, id) => {
 
  this.name = name;
  this.phone = phone;
  this.email = email;
  this.id = id;

};

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
//HOME PAGE
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

//VIEW TABLES
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

//MAKE RESERVATION
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});




// CREATES NEW RESERVATION
app.post("/api/new", function(req, res) {

  var newReservation = req.body;
  newReservation.routeName = newReservation.customerID.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  if (tables.length < 5) {

    tables.push(newReservation);

  } else {

    waitlist.push(newReservation);

  }

  res.json(newReservation);

});








// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
