const express = require("express");
const multer = require("multer");
const router = express.Router();


const UsersCtrl = require("../controladores/user");

//Ruta login
router.post("/login/:user",UsersCtrl.login);
router.post("/l/:user",UsersCtrl.login);


module.exports = router;