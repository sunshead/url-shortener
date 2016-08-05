//URL model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//ids schema: _id & num
var idSchema = Schema({
	_id: {type: String, required: true},
	num: {type: Number, default: 0}
});

// id model
var id = mongoose.model('id', idSchema);

//url schema: _id & url & created_at
var urlSchema = new Schema({
	_id: {type: Number, index: true},
	url : String,
	created_at: Date
});

//before saving any url into the urls collection, increment the num
// in the ids collection an use it as the _id of url
urlSchema.pre('save', function(next){
	var entry = this;
	id.findByIdAndUpdate({_id: 'counter'}, {$inc: {num: 1}}, function(err, id) {
		if (err)
			return next(err);
		entry._id = id.num;
		entry.created_at = new Date();
		next();
	});
});

var url = mongoose.model('url', urlSchema);

module.exports = url;