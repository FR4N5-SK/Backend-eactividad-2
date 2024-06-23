const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UsuarioSchema = new Schema({
  id: ObjectId,
  usuario: {
    type: String
  },
  clave: {
    type: String
  },
  nombre: {
    type: String,
    match: /[a-z]/,
  },
  apellido: {
    type: String,
    match: /[a-z]/,
  },
});

const UsuariosModel = mongoose.model('usuarios', UsuarioSchema)
module.exports = UsuariosModel