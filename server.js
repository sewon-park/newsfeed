// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require ("body-parser")
// var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
// var axios = require("axios");
// var cheerio = require("cheerio");

var PORT = process.env.Port || 3000;
// Initialize Express
var app = express();

var router = express.Router();
// //routes file pass router object
require("./config/routes")(router);



// Database configuration
// var databaseUrl = "scraper";
// var collections = ["scrapedData"];


//Designate public forlder as a static directory
app.use(express.static(__dirname + "/public"));


//Connect Handlebars to express app
app.engine("handlebars", expressHandlebars({
  defaultLayout:"main"
}));

app.set("view engine", "handlebars");

//Set up badyParser
app.use(bodyParser.urlencoded({
  extended:false
}));

//Have every request go through router middleware
app.use(router)

//If deployed, use the deployed database. otherwise use the local mongoHeadlines database
var db= process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to database
mongoose.connect(db, function(error){
  if(error){
    console.log(error);
  }
  else {
    console.log("mongoose connection is successful");
  }
})

// app.get("/", function(req, res) {
//   res.send("Hello world");
// });


// // Hook mongojs configuration to the db variable
// var db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// // Main route (simple Hello World Message)
// app.get("/data", function(req, res) {
//   db.scrapedData.find({}, function(error, found) {
//     // Throw any errors to the console
//     if (error) {
//       console.log(error);
//     }
//     // If there are no errors, send the data to the browser as json
//     else {
//       res.json(found);
//     }
//   });
// });

// // TODO: make two more routes

// // Route 1
// // =======
// app.get("/all", function(req, res) {
//   // Query: In our database, go to the animals collection, then "find" everything
//   db.scrapedData.find({}, function(error, found) {
//     // Log any errors if the server encounters one
//     if (error) {
//       console.log(error);
//     }
//     // Otherwise, send the result of this query to the browser
//     else {
//       res.json(found);
//     }
//   });
// });

// // This route will retrieve all of the data
// // from the scrapedData collection as a json (this will be populated
// // by the data you scrape using the next route)

// // Route 2
// // =======
// // Scrape data from one site and place it into the mongodb db
// app.get("/scrape", function(req, res) {
//   // Make a request via axios for the news section of `ycombinator`
//   axios.get("https://news.ycombinator.com/").then(function(response) {
//     // Load the html body from axios into cheerio
//     var $ = cheerio.load(response.data);
//     // For each element with a "title" class
//     $(".title").each(function(i, element) {
//       // Save the text and href of each link enclosed in the current element
//       var title = $(element).children("a").text();
//       var link = $(element).children("a").attr("href");

//       // If this found element had both a title and a link
//       if (title && link) {
//         // Insert the data in the scrapedData db
//         db.scrapedData.insert({
//           title: title,
//           link: link
//         },
//         function(err, inserted) {
//           if (err) {
//             // Log the error if one is encountered during the query
//             console.log(err);
//           }
//           else {
//             // Otherwise, log the inserted data
//             console.log(inserted);
//           }
//         });
//       }
//     });
//   });

//   // Send a "Scrape Complete" message to the browser
//   res.send("Scrape Complete");
// });




// When you visit this route, the server will
// scrape data from the site of your choice, and save it to
// MongoDB.
// TIP: Think back to how you pushed website data
// into an empty array in the last class. How do you
// push it into a MongoDB collection instead?

/* -/-/-/-/-/-/-/-/-/-/-/-/- */

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port: " + PORT);
});
