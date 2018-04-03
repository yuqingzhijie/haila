var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var CommentSchema = new mongoose.Schema({
  product: {type: ObjectId, ref: 'Product'},
  userId: {type: ObjectId, ref: 'User'},
  userName: String,
  content: String,
  time: {
  	type: Date,
  	default: Date.now()
  },
  star: Number
});

module.exports = mongoose.model('Comment', CommentSchema);