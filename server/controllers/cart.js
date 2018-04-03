var Cart = require('./../models/cart');

//购物车添加商品
exports.add = function(req, res) {
	var user = req.session.user;
	var productId = req.body.productId;
	var number = req.body.number;

	// if (user) {
		Cart.findOne({owner: user._id}, function(err, cart) {
			if (err) {
				res.json({
					status: "0",
					msg: "错误",
					result: ""
				});
			}
			else {
				if (cart) {
					var cartItem = '';
					var cartProductList = cart.productList;
					cartProductList.forEach(function(item) {
						if (item.product == productId) {
							cartItem = item;
							console.log(item.number,number);
							item.number += number;
						}
					});
					if (!cartItem) {
						cartProductList.push({
							product: productId,
							number: number
						});
					}
				}
				else {
					cart = new Cart({
						owner: user._id,
						productList: [
						{
							product: productId,
							number: number
						}
						]
					});
				}
				cart.save(function(err) {
					if (err) {
						res.json({
							status: "0",
							msg: "错误",
							result: ""
						});
					}
					else {
						res.json({
							status: "1",
							msg: "成功",
							result: ""
						});
					}
				});
			}
		});
	/*}
	else {
		res.json({
			status: "2",
			msg: "请先登录",
			result: ""
		});
	}*/
};

//获取购物车列表
exports.list = async function(req, res) {
	var status = "0";
	var msg = "";
	var result = [];
	var user = req.session.user;

	/*if (!user) {
		msg = "未登录";
	}
	else {
		console.log('0');*/
		await (function(){
			return new Promise( function(resolve, reject) {
				Cart.findOne({owner: user._id}).populate('productList.product', 'picture title priceNow stock').exec(
					function(err, cart) {
						if (err) {
							msg = "失败";
						}
						else {
							if (!cart) {
								msg = "您的购物车暂无商品";
							}
							else {
								status = "1";
								msg = "成功";
								result = cart.productList;
							}
						}
						resolve();
					});
			});
		})();
	// }
	// console.log(result[1].product);
	res.json({
		status: status,
		msg: msg,
		result: result
	});
};

//购物车更新
exports.update = async function(req, res) {
	var status = "0";
	var msg = "";
	var user = req.session.user;
	var productId = req.body.product;
	var checked = req.body.checked;
	var number = req.body.number;
	console.log(req.body.product);

	// if (user) {
		await (function(){
			return new Promise(function(resolve, reject){
				Cart.findOne({owner: user._id}, function(err, cart) {
					if (err) {
						msg = "错误";
						return resolve();
					}
					else {
						if (cart) {
							var cartItem = '';
							var cartProductList = cart.productList;
							cartProductList.forEach(function(item) {
								if (item.product == productId) {
									cartItem = item;
									item.checked = checked;
									item.number = number;
								}
							});
							//购物车没有该商品
							if (!cartItem) {
								msg = "没有该商品, 操作无法完成";
								return resolve();
							}
						}
						//购物车为空时
						else {
							msg = "空购物车, 操作无法完成";
							return resolve();
						}
						cart.save(function(err) {
							if (err) {
								msg = "错误";
							}
							else {
								status = "1";
								msg = "成功";
							}
							return resolve();
						});
					}
				});
			});
		})();
	/*}
	else {
		msg = "请先登录";
	}*/
	res.json({
		status: status,
		msg: msg,
		result: ""
	});
};


/*function a(fn){
	return () =>{
		console.log()
		fn && fn()
	}
}*/

exports.toggleCheckAll = function(req, res) {
	var user = req.session.user;
	var flag = req.body.flag;

	// if (user) {
		Cart.findOne({owner: user._id}, function(err, cart) {
			if (err) {
				res.json({
					status: "0",
					msg: "错误",
					result: []
				});
			}
			else {
				if (cart) {
					cart.productList.forEach( (item) => {
						console.log(flag);
						item.checked = flag;
					});
					cart.save(function(err) {
						if (err) {
							res.json({
								status: "0",
								msg: "错误",
								result: []
							});
						}
						else {
							res.json({
								status: "1",
								msg: "成功",
								result: []
							});
						}
					});
				}
				else {
					res.json({
						status: "0",
						msg: "错误",
						result: []
					});
				}
			}
		});
	/*}
	else {
		res.json({
			status: "0",
			msg: "未登录",
			result: []
		});
	}*/
};

//删除商品
exports.delOne = function(req, res) {
	var user = req.session.user;
	var productId = req.body.productId;

	// if (user) {
		Cart.update({owner: user._id}, {$pull: {"productList": {product: productId}}}, function(err) {
			if (err) {
				res.json({
					status: "0",
					msg: "错误",
					result: []
				});
			}
			else {
				res.json({
					status: "1",
					msg: "成功",
					result: []
				});
			}
		});
	/*}
	else {
		res.json({
			status: "0",
			msg: "未登录",
			result: []
		});
	}*/
};

exports.delMany = function(req, res) {
	var user = req.session.user;
	var productId = req.body.productId;

	// if (user) {
		Cart.update({owner: user._id}, {$pull: {"productList": {checked: true}}}, function(err) {
			if (err) {
				console.log(productId, err);
				res.json({
					status: "0",
					msg: "错误",
					result: []
				});
			}
			else {
				res.json({
					status: "1",
					msg: "成功",
					result: []
				});
			}
		});
	/*}
	else {
		res.json({
			status: "0",
			msg: "未登录",
			result: []
		});
	}*/
};