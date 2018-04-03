var Order = require('./../models/order');
var Product = require('./../models/product');
var Cart = require('./../models/cart');

/*exports.add = function(req, res) {
	var userId = req.session.user._id
	var list = req.body.list;
	var count = 0;
	var orderObj = {
		owner: userId,
		productList: [],
		receptionist: req.body.receptionist,
		phoneNumber: req.body.phoneNumber,
		street: req.body.street
	};
	for (let i = 0, len = list.length; i < len; i++) {
		let id = list[i].product._id;
		let number = list[i].number;

		Product.find({_id: id}, function(err, product) {
			orderObj.productList.push({
				product: id,
				number: parseInt(number)
			});
			if (number > product.stock) {
				res.json ({
					status: '0',
					msg: '该商品已卖完',
					result: id
				});
			}
			else {
				count++;
				if (count == len) {
					var order = new Order(orderObj);
					order.save(function(err) {
						let count2 = 0
						let updateCartArr = [];
						for (let k = 0; k < len; k++) {
							Cart.update({owner: userId}, {$pull: {"productList": {product: list[k].product._id}}}, function(err) {
								count2++;
								if (count2 == len) {
									res.json({
										status: "1",
										msg: "成功",
										result: ""
									});
								}
							});
							// updateCartArr.push(updateCart(userId, list[k].product._id);)
						}
					});
				}
			}
		})
	}
};*/
exports.add = function(req, res) {
	var userId = req.session.user._id;
	var list = req.body.list;
	var order = {};
	var orderObj = {
		owner: userId,
		productList: [],
		receptionist: req.body.receptionist,
		phoneNumber: req.body.phoneNumber,
		street: req.body.street
	};
	var resObj = {
		status: "0",
		msg: "商品已被抢空",
		result: ""
	}
	findProduct(list, orderObj, resObj).then(result => {
		order = new Order(orderObj);
		return pullCart(list, userId);
	}).then(result => {
		return saveOrder(order);
	}).then(result => {
		resObj.status = "1";
		resObj.msg = "成功";
		res.json(resObj);
	}).catch(err => {
		if (err == 'back') {
			pushCart();
		}
		return res.json(resObj);
	});
};

function findProduct(list, orderObj, resObj) {
	var arr = list.map(item => {
		return new Promise((resolve, reject) => {
			let id = item.product._id;
			let number = item.number;
			Product.findOne({_id: id}, function(err, product) {
				orderObj.productList.push({
					product: id,
					number: parseInt(number)
				});
				// console.log(product.stock, number);
				console.log('----find----');
				if (product && number < product.stock) resolve();
				else {
					resObj.result = id;
					reject();
				}
			});
		});
	});
	return Promise.all(arr);
}

function pullCart (list, userId) {
	var arr = list.map(item => {
		return new Promise((resolve, reject) => {
			Cart.update(
				{owner: userId},
				{$pull: {"productList": {product: item.product._id}}},
				function(err) {
					console.log('----pull----');
					if (!err) resolve();
					else reject();
			});
		});
	});
	return Promise.all(arr);
}

function pushCart (list, userId) {
	var arr = list.map(item => {
		return new Promise((resolve, reject) => {
			Cart.update(
				{owner: userId},
				{$push: {"productList": {product: item.product._id}}},
				function(err) {
					console.log('----push----');
					if (!err) resolve();
					else reject();
			});
		});
	});
	return Promise.all(arr);
}

function saveOrder(order) {
	return new Promise((resolve, reject) => {
		order.save(err => {
			console.log('----save----');
			if (!err) resolve();
			else reject('back');
		});
	});
}

exports.delete = function(req, res) {

};

exports.getOrderList = function(req, res) {

};