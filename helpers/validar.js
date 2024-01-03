const validator = require("validator");

const validarArticulo = (parametros) => {
    // Validar datos
        let validar_titulo = !validator.isEmpty(parametros.titulo) && validator.isLength(parametros.titulo, {min:5,max:undefined});
        let validar_contenido = !validator.isEmpty(JSON.stringify(parametros.contenido));
        if(!validar_titulo || !validar_contenido){
            throw new Error("No se ha validado la informacion")
        }
}
const validarUser = (parametros) => {
    // Validar datos
        let validar_user = !validator.isEmpty(parametros.user);
        let validar_pass = !validator.isEmpty(parametros.pass);
        let validar_email = !validator.isEmpty(parametros.email);
        if(!validar_user || !validar_pass || !validar_email){
            throw new Error("No se ha validado la informacion")
        }
}
module.exports = {
    validarArticulo,
    validarUser
}