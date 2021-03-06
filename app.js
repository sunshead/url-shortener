//modules required
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
//var config = require('./config'); //local db config 
var base62 = require('./base62.js'); //TBD
//use body-parser middleware to handle post request
var bodyParser = require('body-parser');

var url = require('./models/url');

//connext to local MongoDB
//mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

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
/*
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/url_shortener';
*/

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect("mongodb://heroku_7jz3mvhb:vk9l3enccfq7q3nu06kas8vskq@ds145415.mlab.com:45415/heroku_7jz3mvhb", function (err, res) {
  if (err) {
  console.log ('ERROR connecting to mongoose. ' + err);
  } else {
  console.log ('Succeeded connected to mongoose.');
  }
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
