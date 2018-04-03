var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  title: String,
  category: String,
  place: String,
  brandEn: String,
  brandCn: String,
  summary: String,
  priceOld: Number,
  priceNow: Number,
  stock: Number,
  praise: {
    type: Number,
    default: 1
  },
  evaNumber: {
    type: Number,
    default: 1
  },
  picture: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

ProductSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
    next();
  }
  else {
    this.meta.updateAt = Date.now();
    next();
  }
});


module.exports = mongoose.model('Product', ProductSchema);