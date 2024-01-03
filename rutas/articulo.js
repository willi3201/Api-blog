const express = require("express");
const multer = require("multer");
const router = express.Router();

const almacenamiento = multer.diskStorage({
    destination: (req, file,cb) =>{
        cb(null, './imagenes/articulos/')
    },
    filename:(req,file,cb)=>{
        cb(null, "articulo"+ Date.now() + file.originalname)
    }
})
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(LOGO_PATH);
        cb(null, path.join(__dirname, '..', LOGO_PATH));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const subidas = multer({storage: storage});
const ArticuloCtrl = require("../controladores/articulo");
const UsersCtrl = require("../controladores/user");
//Ruta login
router.post("/login",UsersCtrl.login);
router.post("/register",UsersCtrl.register);
router.get("/buscar/:id",UsersCtrl.search);

// Rutas de prueba
router.get("/ruta-de-prueba", ArticuloCtrl.prueba);
router.get("/curso", ArticuloCtrl.curso);

// Ruta util
router.post("/crear",ArticuloCtrl.crear);
router.get("/articulos/:ultimos?",ArticuloCtrl.listar);
router.get("/articulo/:id",ArticuloCtrl.uno);
router.get("/articulos/user/:id",ArticuloCtrl.filtrar);
router.delete("/articulo/:id",ArticuloCtrl.borrar);
router.put("/articulo/:id",ArticuloCtrl.editar);
router.post("/subir-imagen/:id",ArticuloCtrl.subir);
router.get("/imagen/:fichero",ArticuloCtrl.imagen);
router.get("/buscar/:busqueda",ArticuloCtrl.buscador);



module.exports = router;