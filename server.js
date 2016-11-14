//MODULES
//=========================================
pry = require('pryjs')
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var methodOveride = require('method-override');
var LocalStrategy = require('passport-local').Strategy;
mongoose.Promise = global.Promise;
var port  = process.env.PORT || 3000;
var app = express();
var path    = require('path');

//EXTERNAL FILES
//=================================
var User = require('./models/user.js');
var UsersController = require('./controllers/users.js');
var HelperController = require('./controllers/helpers.js');

//DATABASE CONNECTION
//=================================
var db = mongoose.connection;
var mongoURI = process.env.MONGODB_URI || 'mongodb://localhost/time-manager';
mongoose.connect(mongoURI);

// MIDDLEWARE / CONFIGURATION
// ==================================
app.use(express.static(path.join(__dirname,'public')));

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

//PASSPORT
//=================================
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//To be used when user is created ********
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//MIDDLEWARE ROUTING
//=================================
app.use("/user", UsersController);
app.use("/helper", HelperController);


//USER HOME REGISTER
//=================================
app.get('/', function(req, res){
    res.render('index');
});

//USER HOME REGISTER
//=================================
app.post('/register',  function(req, res){
  console.log("USER REGISTRATION INFORMATION >>>>>", req.body.username);
  User.register(new User({
    username: req.body.username
  }),
  req.body.password,
  function(err, user){
    console.log("AFTER REGISTRATION USER >>>>>>>>", user);
    req.login(user, function(err){
      if (err) {console.log(err); }
      return res.json(user);
    });
  });
});

//USER HOME LOGIN
//=================================
app.post('/login', passport.authenticate('local'), function(req, res){
  res.json(req.user);
});


//USER HOME LOGOUT
//=================================
app.delete('/logout', function(req, res){
  console.log("USER IS LOGGING OUT!!!!!!!");
  req.logout();
  res.send("USER IS LOGGED OUT")
});


//PORT LISTENER
//=========================================
app.listen(port, function() {
    console.log('=======================');
    console.log('RUNNING on PORT ' + port);
    console.log('=======================');
});
