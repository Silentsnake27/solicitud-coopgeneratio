import {Router} from 'express';
const router = Router();
// import request from 'request';
// const {nuevoSocios} = require('../models/nuevos_socios');
import jwt from 'jsonwebtoken';
import {savesocioDB} from '../controllers/Form.Controller';
  // const db = require('../../config/dbConnection');
// const validations = require('../../config/validations');
router.get('/form', (req,res) => {
  var token = req.cookies['SystemAuth'];
    if (req.cookies['SystemAuth']) {
        var admin = ''
        jwt.verify(token,process.env.SECRET_OR_KEY, function (error,decoded){
          if (decoded.role === 'admin') {
               admin = decoded.role
          }  
        })
    }
  var token = req.cookies['SystemAuth'];
    res.render('form',{token,admin});
});


router.post('/form', savesocioDB)

// router.post('/form', savesocioDB, (req,res) =>{
//   req.flash('success_msg', 'Solicitud Enviada Correctamente.');
//   res.redirect('/');
// });
  
  
 


module.exports  = router;



// res.redirect('/');