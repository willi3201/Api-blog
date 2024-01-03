const { validarUser } = require("../helpers/validar");
const User = require("../modelos/User");
const fs = require("fs");
const path = require("path");
const jwt = require('jsonwebtoken');

const login = (req,res) =>{
  console.log("Oks");
  console.log(req.body)
  // return res.status(200).json({
  //         status: "success"
  //       });
  let body = req.body;
  // Buscar el articulo
  User.findOne(body)
    // Devolver resultado
    .then((user) => {
      if (!user) {
        return res.status(403).json({
          mensaje: "Error",
          parametros: "No se han encontrado el user",
        });
      }
      console.log(user)
      if(body.pass!=user.pass){
        return res.status(404).json({
            ok: false,
            err: {
                message: 'Usuario o contraseña incrorrectos'
            }
        });
    }
    let token = jwt.sign({
      user
    }, 'este-es-el-seed', {expiresIn: '48h'});
    return res.status(200).json({
        ok: true,
        user,
        token
      });
    })
    // Si no existe devolver error
    .catch((err) => {
      return res.status(402).json({
        mensaje: "Error",
        parametros: "No se han encontrado el articulo",
      });
    });

}

const register = (req,res) => {
  // Recoger parametros por post a guardar
  let parametros = req.body;
  // Validar datos
  try {
    validarUser(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }
  // Crear el objeto a guardar
  const user = new User(parametros);
  // Asignar valores a objeto basado en el modelo
  // articulo.titulo = parametros.titulo;

  // Guardar el articulo en la base de datos
  user
    .save()
    .then((userGuardado) => {
      if (!userGuardado) { 
        return res.status(400).json({
          mensaje: "Error",
          parametros: "No se ha guardado el usuario",
        });
      }
        let token = jwt.sign({
          userGuardado
        }, 'este-es-el-seed', {expiresIn: '48h'});
        return res.status(200).json({
          ok: true,
          mensaje: "Se ha registrado el usuario",
          userGuardado,
          token
        });
      })
    .catch((err) => {
      return res.status(400).json({
        mensaje: "Error",
        parametros: "No se ha guardado el articulo ",
      });
    });
}
const search = (req,res) =>{
  console.log("Oks");
  console.log(req.params);
  let body = req.params;
  // Buscar el usuario
  User.findById(body.id)
    // Devolver resultado
    .then((user) => {
      if (!user) {
        return res.status(403).json({
          mensaje: "Error",
          parametros: "No se ha encontrado el usuario",
        });
      }
      console.log(user);
    return res.status(200).json({
        ok: true,
        user
      });
    })
    // Si no existe devolver error
    .catch((err) => {
      return res.status(402).json({
        mensaje: "Error",
        parametros: "No se han encontrado el usuario",
      });
    });

}

module.exports = {
  login,register,search
};
