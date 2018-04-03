var Address = require('./../models/address');

exports.getAddressList = function(req, res) {
	var user = req.session.user;
	/*if (!user) {
		res.json({
			status: "0",
			msg: "未登录",
			result: []
		});
	}
	else {*/
		Address.findOne({owner: user._id}, function(err, addressList) {
			if (err) {
				res.json({
					status: "0",
					msg: "未登录",
					result: []
				});
			}
			else if (addressList) {
				res.json({
					status: "1",
					msg: "成功",
					result: addressList.addressList
				});
			}
			else {
				res.json({
					status: "0",
					msg: "空地址列表",
					result: []
				});
			}
		});
	// }
};

exports.add = function(req, res) {
	var user = req.session.user;
	var receptionist = req.body.receptionist;
	var street = req.body.street;
	var phoneNumber = req.body.phoneNumber;

	// if (user) {
		Address.findOne({owner: user._id}, function(err, address) {
			if (err) {
				res.json({
					status: "0",
					msg: "错误",
					result: ""
				});
			}
			else {
				var addressObj = {
					receptionist: receptionist,
					street: street,
					phoneNumber: phoneNumber
				};
				if (address) {
					address.addressList.push(addressObj);
				}
				else {
					address = new Address({
						owner: user._id,
						addressList: [addressObj]
					});
				}
				address.save(function(err) {
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
			status: "0",
			msg: "请先登录",
			result: ""
		});
	}*/
};
exports.setDefault = function(req, res) {
	var user = req.session.user;
	var addressId = req.body.addressId;

	// if (user) {
		Address.findOne({owner: user._id}, function(err, address) {
			if (err) {
				res.json({
					status: "0",
					msg: "错误",
					result: ""
				});
			}
			else {
				if (address) {
					address.addressList.forEach(function(item) {
						console.log(addressId);
						console.log(item._id);
						if (item._id != addressId) {
							item.isDefault = false;
						}
						else {
							console.log(item);
							item.isDefault = true;
						}
					});
				}
				address.save(function(err) {
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
			status: "0",
			msg: "请先登录",
			result: ""
		});
	}*/
};

exports.delAddress = function(req, res) {
	var user = req.session.user;
	var addressId = req.body.addressId;

	// if (user) {
		Address.update({owner: user._id}, {$pull: {"addressList": {_id: addressId}}}, function(err) {
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