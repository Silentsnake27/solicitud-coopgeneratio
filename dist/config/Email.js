"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.solicitudmail = solicitudmail;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _Oficinas = _interopRequireDefault(require("../models/Oficinas"));

var _solicitud = require("../routes/solicitud");

var _config = require("./config");

var _regeneratorRuntime = require("regenerator-runtime");

var _Nuevos_socios = _interopRequireDefault(require("../models/Nuevos_socios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const transporter = _nodemailer.default.createTransport(_config.mail);

const SolicitudSucursal = async function (req, res) {
  const {
    nombre,
    apellido,
    cedula,
    sucursal
  } = req.body; //envio de email

  const DestinoSucursal = await _Oficinas.default.findOne({
    where: {
      oficina: sucursal
    }
  }); //Opciones envio email

  const mailOptions = {
    from: process.env.MAIL_USER,
    //Destino del correo
    to: `${DestinoSucursal.Email_Oficina}`,
    subject: `Nueva solicitud para socio ${nombre} ${cedula}`,
    text: `Nueva solicitud de parte de ${nombre} ${apellido}`,
    attachments: [{
      filename: `${cedula}.pdf`,
      path: _path.default.join(__dirname, `../../${nombre}.pdf`),
      contentType: "application/pdf"
    }]
  }; //Envio del mail

  transporter.sendMail(mailOptions, function (error, info) {
    //validar que haya habido un error
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }

    const filePath = _path.default.join(__dirname, `../../${nombre}.pdf`);

    _fsExtra.default.unlink(filePath);
  });
}; // Function para solicitud de gerencial


const SolicitudGerencial = async function (req, res) {
  const {
    nombre,
    apellido,
    cedula,
    sucursal
  } = req.body; //envio de email

  const DestinoSucursal = await _Oficinas.default.findOne({
    where: {
      oficina: sucursal
    }
  }); //Opciones envio email

  const mailOptions = {
    from: process.env.MAIL_USER,
    //Destino del correo
    to: `${DestinoSucursal.Email_Oficina}`,
    subject: `Solicitud Gerencial ${nombre} ${apellido}`,
    text: `Nueva solicitud de gerencial de parte de ${nombre} ${apellido}`,
    attachments: [{
      filename: `${cedula}.pdf`,
      path: _path.default.join(__dirname, `../../${nombre}.pdf`),
      contentType: "application/pdf"
    }]
  }; //Envio del mail

  transporter.sendMail(mailOptions, function (error, info) {
    //validar que haya habido un error
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }

    const filePath = _path.default.join(__dirname, `../../${nombre}.pdf`);

    _fsExtra.default.unlink(filePath);
  });
}; // Function para Mail de confirmación de solicitud


async function solicitudmail(req, res, user) {
  const {
    cedula
  } = req.params;
  console.log(cedula);
  var data = await _Nuevos_socios.default.findAll({
    where: {
      cedula: `${cedula}`
    },
    raw: true
  }); //  var datta =  JSON.stringify(data);

  for (var i = 0; i < data.length; i++) {
    var datta = data[i]; // console.log(datta)
  }

  const DestinoSucursal1 = await _Oficinas.default.findOne({
    where: {
      oficina: datta.sucursal
    }
  });
  const mailOptions2 = {
    from: process.env.MAIL_USER,
    //Destino del correo
    to: `${DestinoSucursal1.Email_Oficina}`,
    subject: `Nueva Solicitud Aceptada. Sucursal: ${datta.sucursal}`,
    text: `La solicitud para ${datta.nombre}(${datta.cedula}) ha sido aceptada por el usuario ${user}` // attachments: [{
    //     filename: `${cedula}.pdf`,
    //     path: path.join(__dirname, `../../${nombre}.pdf`),
    //     contentType: 'application/pdf'
    // }],

  }; //Envio del mail

  transporter.sendMail(mailOptions2, function (error, info) {
    //validar que haya habido un error
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    } // const filePath = path.join(__dirname, `../../${datta.nombre}.pdf`);
    // fs.unlink(filePath);

  });
}

module.exports = {
  SolicitudSucursal,
  SolicitudGerencial
};