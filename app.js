// ======================================================
// =                                                    =
// =                                                    =
// =                                                    =
// =                                                    =
// =                 (c) simplyalec                     =
// =                                                    =
// =                                                    =
// =                                                    =
// =                                                    =
// =                                                    =
// ======================================================


// ======================================================
// =                   REQUIRES                         =
// ======================================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

var config = require('./config');
var User   = require('./models/apiUser');


// ======================================================
// =                    ROUTES                          =
// ======================================================

//Index page
var index = require('./routes/index');

//REST V1 Routes
var populateQuery = require('./routes/populateQuery');
var test = require('./routes/test');
var findUsers = require('./routes/findUsers');
var auth = require('./routes/auth');

//Middleware
var authMiddleware = require('./middleware/authRoutes');

// ======================================================
// =                    CONFIG                          =
// ======================================================
var app = express();

mongoose.connect(config.database)
app.set('tokenCreation', config.secret);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

app.use('/api/private', authMiddleware);
app.use('/api/private/populateQuery', populateQuery);
app.use('/api/private/test', test);
app.use('/api/private/findUsers', findUsers);
app.use('/api/auth', auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
