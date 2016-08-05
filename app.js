//modules required
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var path = require('path');
var config = require('./config');
var base62 = require('./base62.js'); //TBD
//use body-parser middleware to handle post request
var bodyParser = require('body-parser');

var url = require('./models/url');

//connext to MongoDB
mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);
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
			shortUrl = config.webhost + base62.encode(entry._id);
			res.send({'shortUrl': shortUrl});
		}
		//if new, save to url collection
		else {
			var newUrl = url({url: longUrl});
			newUrl.save(function(err){
				if (err) {
					console.log(err);
				}
				shortUrl = config.webhost + base62.encode(newUrl._id);
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
			res.redirect(config.webhost);
		}
	});

});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});