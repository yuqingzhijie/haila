// var mongoose = require('mongoose');
var User = require('./../models/user');

/*mongoose.connect("mongodb://127.0.0.1:12345/haila");

mongoose.connection.on("connected", function(){
	console.log("MongoDB connected success.");
});
mongoose.connection.on("error", function(){
	console.log("MongoDB connected fail.");
});
mongoose.connection.on("disconnected", function(){
	console.log("MongoDB connected disconnected.");
});
*/
//注册
exports.signup = (req, res) => {
	var userName = req.body.userName;
	var userPwd = req.body.userPwd;

	User.findOne({name: userName}, function(err, doc) {
		//status
		//0------------不成功
		//1------------成功
		if(err) {
			res.json({
				status: "0",
				msg: err.message
			});
		}
		else {
			if(doc) {
				res.json({
					status: "0",
					msg: "已存在该用户名"
				});
			}
			else {
				var user = new User({
					name: userName,
					password: userPwd
				});
				user.save(function(err, result) {
					if (err) {
						res.json({
							status: "0",
							msg: err.message
						});
					}
					else {
						/*res.cookie("userId", result._id, {
							path:'/',
							maxAge:1000*60*60
						});*/
						req.session.user = user;
						res.json({
							status: "1",
							msg: "成功",
							result: {
								userName: userName,
								isAdmin: result.role==1
							}
						});
					}
				});
			}
		}
	});
};

//登录
exports.signin = (req, res) => {
	var userName = req.body.userName;
	var userPwd = req.body.userPwd;

	User.findOne({name: userName}, function(err, user) {
		if (err) {
			res.json({
				status: "0",
				msg: err.message
			});
		}

		else {
			if (!user) {
				res.json({
					status: "0",
					msg: "不存在该用户"
				});
			}

			else {
				user.comparePassword(userPwd, function(err, isMatch) {
					if (err) {
						res.json({
							status: "0",
							msg: err.msg
						});
					}

					if (isMatch) {
						/*res.cookie("userId", user._id, {
							path:'/',
							maxAge:1000*60*60
						});*/
						req.session.user = user;
						res.json({
							status: "1",
							msg: "成功",
							result: {
								userName: userName,
								isAdmin: user.role==1
							}
						});
					}
					else {
						res.json({
							status: "0",
							msg: "密码错误"
						});
					}
				});
			}
		}
	});
};

//退出
exports.logout = (req, res) => {
	/*res.cookie("userId", "", {
		path:"/",
		maxAge:-1
	});*/
	delete req.session.user;
	res.json({
		status:"0",
		msg:'退出成功',
		result:''
	});
};

//cookie登录
exports.checkSignin = (req, res) => {
	/*console.log(req.session.user);
	var id = req.cookies.userId;*/
	var user = req.session.user;
	if(user) {
		res.json({
			status: "1",
			msg: "登录",
			result: {name: user.name, isAdmin: user.role==1}
		});
	}
	else {
		res.json({
			status: '0',
			msg: '未登录'
		});
	}
};

//
exports.signinRequired = function(req, res, next) {
	var user = req.session.user;

	if (!user) {
		return res.json({
			status: '0',
			msg: '未登录',
			result: ""
		});
	}

	next();
};

exports.adminRequired = function(req, res, next) {
	var user = req.session.user;

	if (!user || user.role != 1) {
		return res.json({
			status: '0',
			msg: '非管理员',
			result: ""
		});
	}

	next();
};
