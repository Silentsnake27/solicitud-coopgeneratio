import express from 'express';
import exphbs from 'express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
// import Sequelize from 'sequelize';
// import flash from 'connect-flash';
import session from 'express-session';
// import request from 'request';



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
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middleware
app.use(express.urlencoded({extended: false}));
// app.use(morgan('dev'));
app.use(session({
  secret: 'mysecret27',
  resave: true,
  saveUninitialized: true
}));
// app.use(flash());


// routes
app.use(require('./routes/form'));
app.use(require('./routes/pdf'));

// Static Files
app.use(express.static(path.join(__dirname, './assets')));

// Global Variables
// app.use((req,res,next)=> {
//     res.locals.success_msg = req.flash('success_msg');
//     res.locals.error_msg = req.flash('error_msg');
//     res.locals.error = req.flash('error');
//     res.locals.user = req.user || null;
//     next();
// });
// Server is listenning
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});