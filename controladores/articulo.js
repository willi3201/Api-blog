const { validarArticulo } = require("../helpers/validar");
const Articulo = require("../modelos/Articulo");
const fs = require("fs");
const path = require("path");
const bodyParser = require('body-parser');
const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "Soy una accion de prueba",
  });
};

const curso = (req, res) => {
  console.log("Se ha ejecutado el endpoint probando");

  return res.status(200).json([
    {
      curso: "Master en React",
      autor: "Williams",
      url: "google.com",
    },
    {
      curso: "Master en React",
      autor: "Williams",
      url: "google.com",
    },
  ]);
};

const crear = (req, res) => {
  // Recoger parametros por post a guardar
  let parametros = req.body;
  // console.log(parametros.user_id);
  // Validar datos
  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar "+error,
      parametros
    });
  }
  // Crear el objeto a guardar
  const articulo = new Articulo(parametros);
  // Asignar valores a objeto basado en el modelo
  // articulo.titulo = parametros.titulo;
  // console.log(articulo);
  // Guardar el articulo en la base de datos
  articulo
    .save()
    .then((articuloGuardado) => {
      if (!articuloGuardado) {
        return res.status(401).json({
          mensaje: "Error",
          parametros: "No se ha guardado el articulo "+err,
        });
      }
      return res.status(200).json({
        status: "Success",
        articulo: articuloGuardado,
        mensaje: "Se ha guardado con exito el articulo",
      });
    })
    .catch((err) => {
      return res.status(402).json({
        mensaje: "Error",
        parametros: "No se ha guardado el articulo "+err,
      });
    });
  // Devolver el resultado
  // return res.status(200).json({
  //     mensaje:"Guardado",
  //     parametros:parametros
  // })
};

const listar = (req, res) => {
  let consulta = Articulo.find();
  if (req.params.ultimos) {
    consulta.limit(3);
  }
  consulta
    .sort({ fecha: -1 })
    .then((articulos) => {
      if (!articulos) {
        return res.status(400).json({
          mensaje: "Error",
          parametros: "No se han encontrado el articulo",
        });
      }
      return res.status(200).json({
        status: "success",
        parametro: req.params.ultimos,
        contador: articulos.length,
        articulos,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        mensaje: "Error",
        parametros: "No se han encontrado el articulo",
      });
    });
};

const uno = (req, res) => {
  // Recoger un id por la url
  let id = req.params.id;
  // Buscar el articulo
  Articulo.findById(id)
    // Devolver resultado
    .then((articulo) => {
      if (!articulo) {
        return res.status(400).json({
          mensaje: "Error",
          parametros: "No se han encontrado el articulo",
        });
      }
      return res.status(200).json({
        status: "success",
        articulo,
      });
    })
    // Si no existe devolver error
    .catch((err) => {
      return res.status(400).json({
        mensaje: "Error",
        parametros: "No se han encontrado el articulo",
      });
    });
};

const filtrar = (req, res) => {
  // Recoger un id por la url
  let id = req.params.id;
  // Buscar el articulo
  Articulo.find({ "user_id": { "$regex": id, "$options": "i"}})
    // Devolver resultado
    .then((articulo) => {
      if (!articulo) {
        return res.status(402).json({
          mensaje: "Error",
          parametros: "No se han encontrado el articulo",
        });
      }
      return res.status(200).json({
        status: "success",
        articulo,
      });
    })
    // Si no existe devolver error
    .catch((err) => {
      return res.status(401).json({
        mensaje: "Error",
        parametros: "No se han encontrado articulos "+id,
      });
    });
};

const borrar = (req, res) => {
  let id = req.params.id;
  Articulo.findOneAndDelete({ _id: id })
    .then((articulo) => {
      if (!articulo) {
        return res.status(400).json({
          mensaje: "Error",
          parametros: "No se ha encontrado el articulo",
        });
      }
      return res.status(201).json({
        status: "Success",
        articulo,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        mensaje: "Error al borrar el articulo",
      });
    });
};

const editar = (req, res) => {
  // Recoger id articulo a editar
  let id = req.params.id;
  // Recoger datos del body
  let parametros = req.body;
  // Validar datos
  try {
    validarArticulo(parametros);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos por enviar",
    });
  }
  // Buscar y actualizar articulo
  Articulo.findOneAndUpdate({ _id: id }, parametros, { new: true })
    // Devolver respuesta
    .then((articuloActualizado) => {
      if (!articuloActualizado) {
        return res.status(400).json({
          mensaje: "Error",
          parametros: "No se ha encontrado el articulo",
        });
      }
      return res.status(202).json({
        status: "Success",
        articulo: articuloActualizado,
      });
    })
    .catch((err) => {
      return res.status(403).json({
        mensaje: "Error al editar el articulo",
        error: err,
      });
    });
};

const subir = (req, res) => {
  let id = req.params.id;
  // Configurar multer
  // console.log(req.body[1])
  // let archivo=req.body[0].split(",");
  let archivo=req.body;
  // console.log(archivo[1])

  // Recoger el fichero
  if (!req.file && req.files) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Peticion invalida",
    });
  }
  let data = archivo[1];
  // let buff = new Buffer(data, 'base64');
  // fs.writeFileSync(req.body[1], buff);
  // Nombre del archivo
  // Extension del archivo
  // console.log(img)
  let archivoSplit = req.body[1].split("\.");
  let extension = archivoSplit[1];
  let parametros = { imagen:data};
  // Comprobar extension
  Articulo.findOneAndUpdate({ _id: id }, parametros, { new: true })
    // Devolver resultado
    .then((articulo) => {
      if (!articulo) {
        return res.status(402).json({
          mensaje: "Error",
          parametros: "No se han encontrado el articulo",
        });
      }
      return res.status(200).json({
        status: "success",
        articulo,
      });
    })
    // Si no existe devolver error
    .catch((err) => {
      return res.status(401).json({
        mensaje: "Error",
        parametros: "No se han encontrado articulos "+id,
      });
    });
  // console.log(archivoSplit)
    return res.status(202).json({
            status: "Success",
            articulo: id,
            fichero: req.body,
          });
}

const imagen = (req,res) => {
    let fichero = req.params.fichero;
    let ruta_fisica = './imagenes/articulos/'+fichero;

    fs.stat(ruta_fisica,(error,existe) => {
        if(existe){
            return res.sendFile(path.resolve(ruta_fisica));
        }else{
            return res.status(404).json({
                status:"error",
                mensaje: "La imagen no existe",
              });
        }
    })
}

const buscador = (req,res) => {
  // Sacar el string de busqueda
  let busqueda = req.params.busqueda;
  // Find OR
  Articulo.find({ "$or":[
    { "titulo": { "$regex": busqueda, "$options": "i"}},
    { "contenido": { "$regex": busqueda, "$options": "i"}},
  ]})
  .sort({fecha: -1})
  .then((articulosEncontrados) => {
    if(!articulosEncontrados || articulosEncontrados <= 0){
      return res.status(404).json({
        status: "error",
        mensaje: "Error al buscar articulo"
      });
    }
    return res.status(200).json({
      status: "success",
      articulosEncontrados
    })
  })
  .catch((error) => {

    if(error){
      return res.status(404).json({
        status: "error",
        mensaje: "No se han encontrado artículos"
      });
    }

    
  })
}
const actualizarImg = (req, res) => {
  let id = req.params.id;
  // Configurar multer
  let archivo=req.body[0].split(",");

  // Recoger el fichero
  if (!req.file && req.files) {
    return res.status(400).json({
      status: "Error",
      mensaje: "Peticion invalida",
    });
  }
  let data = archivo[1];
  let buff = new Buffer(data, 'base64');
  fs.writeFileSync(req.body[1], buff);
  // Nombre del archivo
  // Extension del archivo
  let archivoSplit = req.body[1].split("\.");
  let extension = archivoSplit[1];
  
    return res.status(202).json({
            status: "Success",
            articulo: id,
            fichero: req.body,
          });
}
module.exports = {
  prueba,
  curso,
  crear,
  listar,
  uno,
  filtrar,
  borrar,
  editar,
  subir,
  imagen,
  buscador
};
