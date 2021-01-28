import dotenv from "dotenv";
dotenv.config();
import path from "path";
import fs from "fs-extra";
import nodemailer from "nodemailer";
import oficinas from "../models/Oficinas";
import { cedula } from "../routes/solicitud";
import { mail } from "./config";
import { async } from "regenerator-runtime";
import nuevoSocios from "../models/Nuevos_socios";

const transporter = nodemailer.createTransport(mail);

const SolicitudSucursal = async function(req, res) {
  const { nombre, apellido, cedula, sucursal } = req.body;
  //envio de email
  const DestinoSucursal = await oficinas.findOne({
    where: {
      oficina: sucursal
    }
  });

  //Opciones envio email
  const mailOptions = {
    from: process.env.MAIL_USER,
    //Destino del correo
    to: `${DestinoSucursal.Email_Oficina}`,
    subject: `Nueva solicitud para socio ${nombre} ${cedula}`,
    text: `Nueva solicitud de parte de ${nombre} ${apellido}`,
    attachments: [
      {
        filename: `${cedula}.pdf`,
        path: path.join(__dirname, `../../${nombre}.pdf`),
        contentType: "application/pdf"
      }
    ]
  };

  //Envio del mail
  transporter.sendMail(mailOptions, function(error, info) {
    //validar que haya habido un error
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
    const filePath = path.join(__dirname, `../../${nombre}.pdf`);
    fs.unlink(filePath);
  });
};



// Function para Mail de confirmación de solicitud

export async function solicitudmail(req, res, user) {
  const { cedula } = req.params;
  console.log(cedula);

  var data = await nuevoSocios.findAll({
    where: { cedula: `${cedula}` },
    raw: true
  });
  //  var datta =  JSON.stringify(data);
  for (var i = 0; i < data.length; i++) {
    var datta = data[i];
    // console.log(datta)
  }
  const DestinoSucursal1 = await oficinas.findOne({
    where: {
      oficina: datta.sucursal
    }
  });

  const mailOptions2 = {
    from: process.env.MAIL_USER,
    //Destino del correo
    to: `${DestinoSucursal1.Email_Oficina}`,
    subject: `Nueva Solicitud Aceptada. Sucursal: ${datta.sucursal}`,
    text: `La solicitud para ${datta.nombre}(${datta.cedula}) ha sido aceptada por el usuario ${user}`
    // attachments: [{
    //     filename: `${cedula}.pdf`,
    //     path: path.join(__dirname, `../../${nombre}.pdf`),
    //     contentType: 'application/pdf'
    // }],
  };

  //Envio del mail
  transporter.sendMail(mailOptions2, function(error, info) {
    //validar que haya habido un error
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
    // const filePath = path.join(__dirname, `../../${datta.nombre}.pdf`);
    // fs.unlink(filePath);
  });
}

module.exports = {
  SolicitudSucursal
};
