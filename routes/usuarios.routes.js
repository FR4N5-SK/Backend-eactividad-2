var express = require('express');
const usuariosControllers = require('../controllers/usuarios.controllers');
var router = express.Router();

// Mostrar todos los usuarios
router.get('/', function(req, res, next) {
  usuariosControllers.mostrar()
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      usuarios: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Agregar Usuario
router.post('/', function(req, res, next) {
  usuariosControllers.crear(req.body)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      usuario_creado: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Editar Usuario
router.put('/:usuario', function(req, res, next) {
  usuariosControllers.editar(req.body, req.params.usuario)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      usuario_editado: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Mostrar las cuentas del usuario
router.get('/cuentas/:usuario', function(req, res, next) {
  usuariosControllers.cuentas(req.params.usuario)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      cuentas: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Mostrar resumen de todo el banco por tipos de cuentas
router.get('/resumen', function(req, res, next) {
  usuariosControllers.resumen()
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      resumen: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Eliminar Usuario
router.delete('/:usuario', function(req, res, next) {
  usuariosControllers.eliminar(req.params.usuario)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      usuario_eliminado: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

module.exports = router;
