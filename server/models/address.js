var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var AddressSchema = mongoose.Schema({
	owner: {type: ObjectId, ref: 'User'},
	addressList: [{
		receptionist: String,
		street: String,
		phoneNumber: String,
		isDefault: {
			type: Boolean,
			default: false
		}
	}]
});

module.exports = mongoose.model('Address', AddressSchema);