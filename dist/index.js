"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _connectFlash = _interopRequireDefault(require("connect-flash"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _passport = _interopRequireDefault(require("passport"));

var _Authtoken = _interopRequireDefault(require("./middleware/Authtoken"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dbconfig = require("./config/dbconfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

// Initilizations
const app = (0, _express.default)(); // Database Connections

// Test DataBase
_dbconfig.sequelize.authenticate().then(function (err) {
  console.log('Connection has been established successfully.');
}).catch(function (err) {
  console.log('Unable to connect to the database:', err);
}); // Setings


app.set('port', process.env.PORT || 3000);
app.set('views', _path.default.join(__dirname, './views'));
app.engine('.hbs', (0, _expressHandlebars.default)({
  defaultLayout: 'main',
  layoutDir: _path.default.join(app.get('views'), 'layouts'),
  partialsDir: _path.default.join(app.get('views'), 'partials'),
  extname: '.hbs' // helpers: {
  //   admin:{
  //     function(req,res, opts) {
  //       if(req.cookies['SystemAuth'].lenght > 0) // Or === depending on your needs
  //           return opts.fn(this);
  //       else
  //           return opts.inverse(this); } 
  //   }
  // }

}));
app.set('view engine', '.hbs');
app.use(_express.default.static(_path.default.join(__dirname, './assets')));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use((0, _methodOverride.default)('_method')); // initializate Cookies

var cookieSecret = process.env.COOKIE_SECRET;
app.use((0, _cookieParser.default)(cookieSecret)); // expres-session initializate

app.use((0, _expressSession.default)({
  secret: 'RthG27',
  resave: false,
  saveUninitialized: false
})); //passport Initializate

app.use(_passport.default.initialize()); // app.use(passport.session());
// passport.use(strategy);

app.use((0, _connectFlash.default)()); // Global Variables

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
}); // customs middlewares

app.use(_Authtoken.default); // routes

app.use(require('./routes/gerencial'));
app.use(require('./routes/form'));
app.use(require('./routes/logout'));
app.use(require('./routes/signup'));
app.use(require('./routes/signin'));
app.use(require('./routes/home'));
app.use(require('./routes/adminlogin')); // search form

app.get('/buscador', (req, res) => {
  var token = req.cookies['SystemAuth'];

  if (req.cookies['SystemAuth']) {
    var admin = '';

    _jsonwebtoken.default.verify(token, process.env.SECRET_OR_KEY, function (error, decoded) {
      if (decoded.role === 'admin') {
        admin = decoded.role;
      }
    });
  }

  res.render('buscador', {
    admin,
    token
  });
});
app.use('/solicitud', require('./routes/solicitud')); // Static Files
// Server is listenning

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});