var Comment = require('./../models/comment');


//添加评论
//这里简化,由于时间较紧,没有创造商品购买记录表,这样导致没买过商品的人也能评价
//这里只能评价一次
exports.add = function(req, res) {
	var user = req.session.user;
	/*if (!user) {
		res.json({
			status: 0,
			msg: "未登录",
			result: ""
		});
	}
	else {*/
		var comment = {
			product: req.body.productId,
			userId: user._id,
			userName: user.name,
			content: req.body.content,
			star: req.body.starLevel
		};
		Comment.findOne({product: comment.product, userId: comment.userId}, function(err, result) {
			if (err) {
				res.json({
					status: 0,
					msg: "错误",
					result: ""
				});
			}
			else {
				if (result) {
					res.json({
						status: 0,
						msg: "您已评价",
						result: ""
					});
				}
				else {
					var commentObj = new Comment(comment);
					commentObj.save(function(err) {
						if (err) {
							res.json({
								status: 0,
								msg: "错误",
								result: ""
							});
						}
						else {
							res.json({
								status: 1,
								msg: "成功",
								result: ""
							});
						}
					});
				}
			}
		});
	// }
};

exports.commentList = function(req, res) {
	var productId = req.query.productId;
	var page = parseInt(req.query.page);
	var pageSize = parseInt(req.query.pageSize);
	var sort = -1;
	console.log(req.query);
	Comment.find({product: productId}).sort({'time': sort}).exec(function (err, list) {
		if (err) {
			res.json({
				status: '0',
				msg: err.message
			});
		}
		else {
			if (!list) {
				res.json({
					status: '0',
					msg: '暂无评论'
				});
			}
			else {
				page = page > 0 ? page : (0 - page);
				pageSize = pageSize > 0 ? pageSize : (0 - pageSize);
				//result存储返回数据
				var result = [];
				var skip = (page - 1) * pageSize;
				var length = list.length;
				//pageTotal总页数
				var pageTotal = Math.ceil(length / pageSize);
				console.log(page, pageSize, length, pageTotal);

				if (page <= pageTotal) {
					for (var i = 0; i < pageSize; i++) {
						if (skip < length) {
							result[i] = list[skip++];
						}
						else {
							res.json({
								status: "1",
								msg: "成功",
								result: {
									list: result,
									pageTotal: pageTotal
								}
							});
						}
					}
				}
				else {
					res.json({
						status: "0",
						msg: "已是最后一页"
					});
				}
			}
		}
	});
};