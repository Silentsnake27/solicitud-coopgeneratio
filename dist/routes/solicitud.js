"use strict";

var _regeneratorRuntime = require("regenerator-runtime");

var _express = require("express");

var _Nuevos_socios = _interopRequireDefault(require("../models/Nuevos_socios"));

var _Data_register = _interopRequireDefault(require("../models/Data_register"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
// router.get('/', async (req, res) => 
//   await nuevoSocios.findAll()
//     .then(nuevos_socios => res.render('solicitud', {
//       nuevos_socios
//       }))
//     .catch(err => console.log(err)));
router.put('/edit/:id', async (req, res) => {
  const {
    acept
  } = req.body;
  const {
    id
  } = req.params;
  var values = {
    estado_solicitud: acept
  };
  var selector = {
    where: {
      id
    }
  };
  await _Nuevos_socios.default.update(values, selector).then(function () {
    req.flash('success_msg', 'Solicitud Aceptada Correctamente.');
    res.redirect('/buscador');
  }).catch(error => {// error handling
  });
});
router.delete('/delete/:id', async (req, res) => {
  const {
    id
  } = req.params; // console.log(id);

  await _Nuevos_socios.default.destroy({
    where: {
      id: id
    }
  });
  await _Data_register.default.destroy({
    where: {
      id: id
    }
  }).then(function () {
    req.flash('success_msg', 'Solicitud rechazada correctamente.');
    res.redirect('/buscador');
  }).catch(error => {
    console.log(error);
  });
}); // Search for solicitudes

router.get('/search', async (req, res) => {
  let {
    cedula
  } = req.query;
  var token = req.cookies['SystemAuth'];

  if (req.cookies['SystemAuth']) {
    var admin = '';

    _jsonwebtoken.default.verify(token, process.env.SECRET_OR_KEY, function (error, decoded) {
      if (decoded.role === 'admin') {
        admin = decoded.role;
      }
    });
  }

  await _Nuevos_socios.default.findAll({
    where: {
      cedula: `${cedula}`
    }
  }).then(nuevos_socios => res.render('solicitud', {
    nuevos_socios,
    token,
    admin
  })).catch(err => console.log(err));
});
module.exports = router; // router.post('/solicitud', (req,res,next) => {
// const {cedula} = req.body;
// DataRegister.findOne(({ where: {cedula: `${cedula}`} }),  (err, result) => {
//     if(err) {
//         res.render('solicitud.ejs', {products: null});
//     }
//     res.render('solicitud.ejs', {cedula: result});
//     next();
// });
// });