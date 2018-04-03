var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var CartSchema = new mongoose.Schema({
  owner: {type: ObjectId, ref: 'User'},
  productList: [{
    product: {type: ObjectId, ref: 'Product'},
    checked: {type: Boolean, default: true},
    number: Number
  }]
});

module.exports = mongoose.model('Cart', CartSchema);