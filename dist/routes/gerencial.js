"use strict";

var _express = require("express");

var _Gerencial = require("../controllers/Gerencial.Controller");

const router = (0, _express.Router)();
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
  res.render("gerencial", {
    token,
    admin
  });
});
router.post('/gerencial', _Gerencial.GerencialController);
module.exports = router;