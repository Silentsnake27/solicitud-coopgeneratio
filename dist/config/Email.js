"use strict";

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _oficinas = _interopRequireDefault(require("../models/oficinas"));

var _config = require("./config");

var _regeneratorRuntime = require("regenerator-runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const transporter = _nodemailer.default.createTransport(_config.mail);

const SolicitudSucursal = async function (req, res) {
  const {
    nombre,
    apellido,
    cedula,
    sucursal
  } = req.body; //envio de email

  const DestinoSucursal = await _oficinas.default.findOne({
    where: {
      oficina: sucursal
    }
  }); //Opcionoes envio email

  const mailOptions = {
    from: 'ramiperez26@gmail.com',
    //Destino del correo
    to: `${DestinoSucursal.Email_Oficina}`,
    subject: `Nueva solicitud para socio ${nombre} ${cedula}`,
    text: `Nueva solicitud de parte de ${nombre} ${apellido}`,
    attachments: [{
      filename: `${cedula}.pdf`,
      path: _path.default.join(__dirname, `../../${nombre}.pdf`),
      contentType: 'application/pdf'
    }]
  }; //Envio del mail

  transporter.sendMail(mailOptions, function (error, info) {
    //validar que haya habido un error
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }

    const filePath = _path.default.join(__dirname, `../../${nombre}.pdf`);

    _fsExtra.default.unlink(filePath);
  });
};

module.exports = {
  SolicitudSucursal
};