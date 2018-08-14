/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');


const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({ path: '.env.example' });

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const apiController = require('./controllers/api');
const contactController = require('./controllers/contact');
// const mongodb = require('mongodb');
/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

/**
 * Create Express server.
 */
const app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// mongodb.MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
//   if (err) {
//     throw err;
//     process.exit();
//   }
/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT ||'9000');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(expressStatusMonitor());
app.use(compression());
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
 
	if (!req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.originalUrl;
  } else if (req.user &&
    (req.path === '/account' || req.path.match(/^\/api/))) {
    req.session.returnTo = req.originalUrl;
  }
	
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

/**
 * Primary app routes.
 */
app.use((req, res, next) => {
    // if (req.path === '/account/importPhotosFromInstagram' ) {
        next();
    // } else {
    //     lusca.csrf()(req, res, next);
    // }
});
app.get('/', homeController.index);

app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConfig.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
app.get('/account/detail', passportConfig.isAuthenticated, userController.getAccountDetail);
app.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
app.post('/account/importPhotosFromInstagram', passportConfig.isAuthenticated, userController.importUserPhotos);

app.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);
app.get('/account/getAllUnSubmitedPhotos', passportConfig.isAuthenticated, userController.getAllUnSubmitedPhotos);
app.get('/account/myblog/:userId', homeController.getUserBlog);

/**
 * API examples routes.
 */
app.get('/api', apiController.getApi);

app.get('/api/importInstagramPhotos', passportConfig.isAuthenticated,  apiController.getFacebook);

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
app.get('/auth/facebook/callback',passport.authenticate('facebook',(req,res)=>{
  res.cookie('user',req.user);  
res.redirect('https://buymylooks.westeurope.cloudapp.azure.com/');
}), (req, res) => {
res.cookie('user',req.user);  
res.redirect('https://buymylooks.westeurope.cloudapp.azure.com/');
});

app.get('/admin', apiController.getApi);

/**
 * Admin apis need to add a check in the authenticate function to check is the user is admin or not
 * */
app.get('/admin/listAllPhotosForReview', passportConfig.isAuthenticated,  apiController.getAllPhotos);


/**
 * Error Handler.
 */
if (process.env.NODE_ENV === 'development') {
  // only use in development
  app.use(errorHandler());
}

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

module.exports = app;

























