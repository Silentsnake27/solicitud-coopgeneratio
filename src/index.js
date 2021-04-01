import dotenv from 'dotenv';dotenv.config();
import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash';
import methodOverride from 'method-override';
import session from 'express-session';
// import passport and passport-jwt modules
import passport  from 'passport';
// import passportJWT from 'passport-jwt';
// import User from './models/User';
import Authtoken from './middleware/Authtoken';
import jwt from 'jsonwebtoken';
// Initilizations
const app = express();

// Database Connections
import {sequelize} from './config/dbconfig';
// Test DataBase
 sequelize.authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

// Setings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, './views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    // helpers: {
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
app.use(express.static(path.join(__dirname, './assets')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

// initializate Cookies
var cookieSecret = process.env.COOKIE_SECRET;
app.use(cookieParser(cookieSecret ))
// expres-session initializate
app.use(session({
  secret: 'RthG27',
  resave: false,
  saveUninitialized: false,
}));

//passport Initializate
app.use(passport.initialize());
// app.use(passport.session());
// passport.use(strategy);
app.use(flash());
// Global Variables
app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });

  // customs middlewares
  app.use(Authtoken);

  // routes
  app.use(require('./routes/gerencial'));
  // app.use(require('./routes/form'));
  app.use(require('./routes/logout'));
  app.use(require('./routes/signup'));
  app.use(require('./routes/signin'));
  app.use(require('./routes/home'));
  app.use(require('./routes/adminlogin'));

  // search form
  app.get('/buscador', (req,res) =>{
    var token = req.cookies['SystemAuth'];
    if (req.cookies['SystemAuth']) {
        var admin = ''
        jwt.verify(token,process.env.SECRET_OR_KEY, function (error,decoded){
          if (decoded.role === 'admin') {
               admin = decoded.role
          }  
        })
    }    res.render('buscador', {admin,token});
  }); 
  
  app.use('/solicitud', require('./routes/solicitud'));
  // Static Files

  
  // Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
  });