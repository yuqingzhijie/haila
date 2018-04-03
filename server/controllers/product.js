var multer = require('multer');

var Product = require('./../models/product');
var storage = multer.diskStorage({
	// 保存位置
	destination: './static/upload',
	// 上传文件重命名
	filename: function (req, file, cb) {
		cb(null,  Date.now() + '-' + file.originalname);
	}
});
var upload = multer({ storage: storage });

//商品图片保存处理
exports.savePoster = upload.single('file');

//添加商品
exports.add = function(req, res) {
	var productObj = req.body.product;
	var path = req.file.path;

	productObj.picture = path;
	productObj.priceOld = parseFloat(productObj.priceOld);
	productObj.priceNow = parseFloat(productObj.priceNow);
	productObj.stock = parseInt(productObj.stock);

	product = new Product(productObj);

	product.save(function(err, product) {
		if (err) {
			res.json({
				status: "0",
				msg: "失败",
				rusult: ''
			});
		}
		else {
			res.json({
				status: "1",
				msg: "成功",
				rusult: ''
			});
		}
	});

};

//取得首页商品
//page: 第几页
//pageSize: 每页数量
//sort: 排序
//type: 类别（国家/商品分类)格式: ['category','母婴儿童','手表配饰'];
/*function findType(page, pageSize, sort, typeList) {
	var result = {};
	var type = typeList[0];
	var skip = (page-1)*pageSize;
	var length = typeList.length;
	console.log(type, skip, pageSize, length);
	switch(type) {
		case 'category':
			for (let i = 1; i < length; i++) {
				Product.find({category: typeList[i]}).skip(skip).limit(pageSize).sort('meta.updateAt').exec(function (err, doc) {
					if(err) {
						return -1;
					}
					else {
						result[typeList[i]] = doc;
					}
				});
			}
			break;
		case 'place':
			for (let i = 1; i < ength; i++) {
				Product.find({place: typeList[i]}).skip(skip).limit(pageSize).sort('meta.updateAt').exec(function (err, doc) {
					if(err) {
						return -1;
					}
					else {
						result[typeList[i]] = doc;
						console.log()
					}
				});
			}
			break;
	}
	return result;
}*/

exports.home = function(req, res) {
	var page = parseInt(req.param("page"));
	var pageSize = parseInt(req.param("pageSize"));
	var sort = parseInt(req.param("sort"));
	var typeList = req.param("typeList");

	var length = typeList.length;
	var skip = (page - 1) * pageSize;
	var result = {};

	//times解决异步问题
	var times = 0;
	for (let i = 0; i < length; i++) {
		let type = typeList[i];
		Product.find({category: type}).skip(skip).limit(pageSize).sort('meta.updateAt').exec(function (err, doc) {
			if(err) {
				res.json({
					status: "0",
					msg: "失败",
					result: ''
				});
			}
			else {
				times++;
				result[type] = doc;
				if (times == length) {
					res.json({
						status: "1",
						msg: "成功",
						result: result
					});
				}
				/*console.log(i, type, doc);*/
			}
		});
	}

};

//分类列表
exports.category = function(req, res) {
	var page = parseInt(req.param("page"));
	var pageSize = parseInt(req.param("pageSize"));
	var sort = parseInt(req.param("sort"));
	var category = req.param("category");
	var skip = (page - 1) * pageSize;
	var result = [];

	Product.find({category: category}).skip(skip).limit(pageSize).sort('meta.updateAt').exec(function (err, doc) {
		if(err) {
			res.json({
				status: "0",
				msg: "失败",
				result: ''
			});
		}
		else {
			res.json({
				status: "1",
				msg: "成功",
				result: doc
			});
		}
	});

};
//搜索列表
exports.search = function(req, res) {
	var page = parseInt(req.param("page"));
	var pageSize = parseInt(req.param("pageSize"));
	var sort = parseInt(req.param("sort"));
	var keyword = req.param("keyword");
	var skip = (page - 1) * pageSize;
	var reg = new RegExp(keyword);
	var result = [];

	Product.find({
		$or: [
			{brandCn: {$regex: reg}},
			{brandEn: {$regex: reg}},
			{title: {$regex: reg}},
			{category: {$regex: reg}}
		]
	}).skip(skip).limit(pageSize).sort('meta.updateAt').exec(function (err, doc) {
		if(err) {
			res.json({
				status: "0",
				msg: "失败",
				result: ''
			});
		}
		else {
			res.json({
				status: "1",
				msg: "成功",
				result: doc
			});
		}
	});
};

exports.detail = function(req, res) {
	var productId = req.param("productId");

	Product.findOne({_id: productId}, function(err, product) {
		if(err) {
			res.json({
				status: "0",
				msg: "失败",
				result: ""
			});
		}
		else {
			if (product) {
				res.json({
					status: "1",
					msg: "成功",
					result: product
				});
			}
			else {
				res.json({
					status: "0",
					msg: "未找到",
					result: ""
				});
			}
		}
	});
};
