//modules required
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var mongodb = require("mongodb");
var path = require('path');
//var config = require('./config');
var base62 = require('./base62.js'); //TBD
//use body-parser middleware to handle post request
var bodyParser = require('body-parser');

var url = require('./models/url');

//connext to MongoDB
//mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

//serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

//homepage routing
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

//convert url routing
app.post('/api/convert', function(req, res) {
	var longUrl = req.body.url;
	var shortUrl = '';

	//check if url already saved
	url.findOne({url: longUrl}, function (err, entry){
		//if exist, return
		if (entry) {
			shortUrl = "https://url-converter.herokuapp.com/" + base62.encode(entry._id);
			res.send({'shortUrl': shortUrl});
		}
		//if new, save to url collection
		else {
			var newUrl = url({url: longUrl});
			newUrl.save(function(err){
				if (err) {
					console.log(err);
				}
				shortUrl = "https://url-converter.herokuapp.com/" + base62.encode(newUrl._id);
				res.send({'shortUrl': shortUrl});
			});
		}
	});

});

//fetch original page routing
app.get('/:encoded_id', function(req, res) {
	var shortId = req.params.encoded_id;
	var id = base62.decode(shortId);

	//check if url already saved
	url.findOne({_id: id}, function(err, entry) {
		if (entry) {
			res.redirect(entry.url);
		} else {
			res.redirect("https://url-converter.herokuapp.com/");
		}
	});

});
