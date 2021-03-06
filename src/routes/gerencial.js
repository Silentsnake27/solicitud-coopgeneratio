import { Router } from "express";
const router = Router();

import {GerencialController} from '../controllers/Gerencial.Controller';

router.get("/gerencial", (req, res) => {
  var token = req.cookies["SystemAuth"];
  if (req.cookies["SystemAuth"]) {
    var admin = "";
    jwt.verify(token, process.env.SECRET_OR_KEY, function (error, decoded) {
      if (decoded.role === "admin") {
        admin = decoded.role;
      }
    });
  }
  var token = req.cookies["SystemAuth"];
  res.render("gerencial", { token, admin });
});

router.post('/gerencial', GerencialController)

module.exports  = router;
