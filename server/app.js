var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var mongoose = require('mongoose');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var dbUrl = 'mongodb://127.0.0.1:12345/haila';
var app = express();

/*var index = require('./controllers/index');
var user = require('./controllers/user');*/
mongoose.connect(dbUrl);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirna]\me, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'haila',
  store: new mongoStore({
    url: dbUrl,
    collection: 'sessions'
  })
}));

/*//var upload = multer({dest: './public/upload/post/'});// for parsing multipart/form-data
app.use(bodyParser.urlencoded({ extended: false }));// for parsing application/x-www-form-urlencode
app.use(bodyParser.json());// for parsing application/json*/

/*app.use('/', index);
app.use('/user', user);*/
require('./config/routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({
	status:"0",
	msg:'error',
	result:''
  });
});

module.exports = app;
