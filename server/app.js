var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mysqlClient = require("./bin/mysql_client");
const expressJwt = require('express-jwt');
var secret_file = require('./secret');
var cors = require('cors');


// router
var authRouter = require('./routes/authHandler');
var userRouter = require('./routes/userHandler');
var walletRouter = require('./routes/walletHandler');
var groupRouter = require('./routes/groupHandler');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('../client/dist'));
// jwt middleware for checking existence od jwt token for paths other than the mentioned ones
app.use(expressJwt({secret: secret_file.secret}).unless({path: ['/api/auth', '/api/auth/login']}));
app.use(cors());


// MySQL connection
mysqlClient.connectDB(function (tid) {
        console.log('connected as id ' + tid);
        console.log('Database and tables created!');
    }, function (err) {
        console.log("Error: ", err);
});


/*
    Routes
 */
// db state
app.use(function(req, res, next) {
    req.connection = mysqlClient;
    next();
});
// user router
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/group', groupRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
