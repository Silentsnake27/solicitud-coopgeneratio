// import os from 'os';
import request from "request";
import "regenerator-runtime/runtime";
import puppeteer from "puppeteer";
import fs from "fs-extra";
import hbs from "handlebars";
import path from "path";
// import DataRegister from "../models/Data_register";

import mail from "../config/Email";

export async function GerencialController(req, res) {
  // const captcha = req.body["g-recaptcha-response"];
  // // Secret Key
  // const secretKey = "6Lc7Q7MUAAAAAOiHyEwkMOxgJvSv1sF9avSLEOs6";
  // // Verify URL
  // var verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}&remoteip=${req.connection.remoteAddress}`;

  // // Make Request To VerifyURL
  // request(verifyURL, (err, response, body) => {
  //   body = JSON.parse(body);
  //   // console.log(body);

  //   // if not successful
  //   if (body.success !== undefined && !body.success) {
  //     console.log("FaileCaptcha");
  //   }
  // });

  const {
    nombre,
    apellido,
    cedula,
    codigo,
    celular,
    monto,
    plazo,
    cuenta,
    motivo,
    sucursal,
  } = req.body;
  console.log(req.body);

  let errors = [];
  //nombre validations
  if (nombre.lenght <= 3) {
    errors.push({
      text: "El Nombre debe de tener más de 3 caracteres",
    });
  }
  if (typeof nombre !== "string" && /^[a-z]+$/i.test(nombre)) {
    errors.push({
      text: "El Nombre no puede tener caracteres númericos",
    });
  }
  //apellido validations
  if (apellido.lenght <= 3) {
    errors.push({
      text: "El Apellido debe de tener más de 3 caracteres",
    });
  }
  if (typeof apellido !== "string" && /^[a-z]+$/i.test(apellido)) {
    errors.push({
      text: "El Apellido no puede tener caracteres númericos",
    });
  }
  //cedula validations
  if (cedula.lenght <= 8) {
    errors.push({
      text: "La Cedula debe tener mas de  8 digitos",
    });
  }
  //codigo validations
  // if (!codigo) {
  //     errors.push({
  //         text: "El Codigo "
  //     })
  // }
  //celular validations
  if (celular.length < 8) {
    errors.push({
      text: "El Celular debe de tener por lo menos 8 Digitos",
    });
  }

  //celular validations
  if (!monto) {
    errors.push({
      text: "El Monto es necesario",
    });
  }

  if (!plazo) {
    errors.push({
      text: "El Monto es necesario",
    });
  }

  if (!cuenta) {
    errors.push({
      text: "El Monto es necesario",
    });
  }

  if (!motivo) {
    errors.push({
      text: "El Monto es necesario",
    });
  }

  if (!sucursal) {
    errors.push({
      text: "El Monto es necesario",
    });
  }

  //errors validations
  if (errors.length > 0) {
    res.render("form", {
      errors,
      nombre,
      apellido,
      estadocivil,
      cedula,
      codigo,
      celular,
      monto,
      plazo,
      cuenta,
      motivo,
      sucursal,
    });
  } else {
    // // Look for cedula coincidence
    // const cedulaUser = await DataRegister.findOne({
    //     where: {
    //       cedula: `${cedula}`
    //     }
    //   });
    //   if (cedulaUser) {
    //     req.flash('error_msg', 'Usted ya tiene una solicitud en progreso.');
    //     res.redirect('/');
    //     return
    //   } else {
    const datta = req.body;
    const compile = async function (templateName, datta) {
      const filePath = path.join(
        process.cwd(),
        "./src/views",
        `${templateName}.hbs`
      );
      const html = await fs.readFile(filePath, "utf-8");
      // console.log(html);
      return hbs.compile(html)(datta);
    };
    (async function () {
      try {
        const browser = await puppeteer.launch({
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          // args: [`--window-size=${options.width},${options.height}`],
          // '--font-render-hinting=medium'
          headless: true,
        });
        const page = await browser.newPage();
        //     await page.setViewport({
        //       width: 1440,
        //       height: 900,
        //       deviceScaleFactor: 2
        // });

        const content = await compile("pdfgerencial", datta);
        // console.log(content);

        await page.goto(`data:text/html;charset=UTF-8,${content}`, {
          waitUntil: "networkidle0",
        });
        const options = {
          // height: '1110px', // version para dev
          // width: '816px', //version para dev
          // height: '1210px', //hay que editar esto bien para heroku
          // width: '915px', //hay que editar esto bien para heroku
          format: "A4",
          headerTemplate: "<p></p>",
          footerTemplate: "<p></p>",
          pageRanges: "1-1",
          displayHeaderFooter: false,
          margin: {
            top: "10px",
            bottom: "30px",
          },
          printBackground: true,

          path: `${nombre}.pdf`,
        };
        await page.emulateMedia("screen");
        await page.pdf(options);
        console.log("done");
        await browser.close();
      } catch (e) {
        // req.flash('error_msg', 'ha habido un error.');
        // res.redirect('/form');
        console.log(e);
      }

      try {
        mail.SolicitudGerencial(req, res);
      } catch (e) {
        console.log(e);
      }
    })();

    //   }
    req.flash("success_msg", "Solicitud Enviada Correctamente.");
    res.redirect("/");
  }
}
