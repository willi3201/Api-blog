const {conexion} = require('./basedatos/conexion')
const express = require("express");
const cors = require("cors");

// Inicializar app
console.log("App de node arrancada");

// Conectar a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

// Convertir body a objeto js
app.use(express.json()); //Recibir datos con content/type aplication/json
app.use(express.urlencoded({extended:true})); //datos por form-urlencoded

// Crear rutas
const rutas_articulo = require("./rutas/articulo");
// const rutas_users = require("./rutas/users");

// Cargo las rutas
app.use("/api", rutas_articulo);
// app.use("/login", rutas_users);

// Rutas prueba hardcodeadas
app.get("/probando",(req,res) =>{

    console.log("Se ha ejecutado el endpoint probando")

    return res.status(200).json([{
        curso: "Master en React",
        autor:"Williams",
        url:"google.com"
    },{
        curso: "Master en React",
        autor:"Williams",
        url:"google.com"
    }]);
});

app.get("/",(req,res) =>{

    // console.log("Se ha ejecutado el endpoint probando")

    return res.status(200).send(`<h1>Bienvenido</h1>`);
});


// Crear servidor y escuchar peticiones
app.listen(puerto, ()=>{
    console.log("Servidor corriendo en el puerto "+puerto);
})
