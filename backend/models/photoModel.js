var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var photoSchema = new Schema({
	'name' : String,
	'path' : String,
	'postedBy' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'user'
	},
	'views' : Number,
	'likes' : Number,
	'dislikes':Number,
	'message': String,
	'comments': [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
	createdAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model('photo', photoSchema);
