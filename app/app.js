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
console.log("ImgurScan backend started. Waiting for connections.");

// ======================================================
// =                   REQUIRES                         =
// ======================================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var purge = require('../imgurscan2/purge');

var config = require('./config');


// ======================================================
// =                    CONFIG                          =
// ======================================================
console.log("Configuring settings.");
var app = express();

mongoose.connect(config.database);
app.set('tokenCreation', config.secret);
app.set('maxNumberOfQueries', config.maxNumberOfQueries);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

console.log("Setting up auto database purging.");
purge.purge(config.databasePurgeMinutes);

// ======================================================
// =                    ROUTES                          =
// ======================================================
console.log("Defining site routes.");

//Index page
var index = require('./routes/index');

//REST V1 Routes
var populateQuery = require('./routes/populateQuery');
var getResults = require('./routes/getResults');
var test = require('./routes/test');
var findUsers = require('./routes/findUsers');
var findQueries = require('./routes/findQueries');
var auth = require('./routes/auth');

var createUser = require('./routes/createUser');

//Middleware
var authMiddleware = require('./middleware/authRoutes');

app.use('/', index);

app.use('/api/private', authMiddleware);
app.use('/api/private/populateQuery', populateQuery);
app.use('/api/private/test', test);
app.use('/api/private/findUsers', findUsers);
app.use('/api/private/findQueries', findQueries);
app.use('/api/auth', auth);
app.use('/api/getResults', getResults);

app.use('/api/createUser', createUser);

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

// -------------------------------------------------------------------


module.exports = app;
