//modules required
var express = require('express');
var app = express();

//homepage routing
app.get('/', function(req, res) {

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