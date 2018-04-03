var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var OrderSchema = new mongoose.Schema({
	owner: {
		type: ObjectId,
		ref: 'User'
	},
	productList: [{
		product: {
			type: ObjectId,
			ref: 'Product'
		},
		number: Number
	}],
	receptionist: String,
	street: String,
	phoneNumber: String,
	isPay: {
		type: Boolean,
		default: true
	},
	time: {
		type: Date,
		default: Date.now()
	}
});

module.exports = mongoose.model('Order', OrderSchema);