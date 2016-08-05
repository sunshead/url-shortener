//modules required
var express = require('express');
var app = express();
var path = require('path');

//serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

//homepage routing
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'views/index.html'));
});

//shorten url routing
app.post('/api/shorten', function(req, res) {

});

//fetch original page routing
app.get('/:id', function(req, res) {

});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});