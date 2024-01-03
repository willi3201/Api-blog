const { Schema, model } = require("mongoose");

const ArticuloSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: Array,
        "isEmpty": false,
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    fechaModificacion: {
        type: Date,
        required: false
    },
    imagenName: {
        type: String
    },
    imagen: {
        type: Array
    },
    user_id: {
        type: String,
        required: false
    }
});

module.exports = model("Articulo",ArticuloSchema,"articulos");