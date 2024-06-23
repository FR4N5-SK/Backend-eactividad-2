var express = require('express');
const cooperativasControllers = require('../controllers/cooperativas.controllers');
var router = express.Router();

// Mostrar todos los grupos de cooperativas
// Ya esta vinculado a la base de datos
router.get('/', function(req, res, next) {
  cooperativasControllers.mostrar()
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      grupos: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Agregar Grupo de Cooperativa
// Ya esta vinculado a la base de datos
router.post('/', function(req, res, next) {
  cooperativasControllers.crear(req.body)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      grupo_creado: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Editar Grupos Cooperativas
// Ya esta vinculado a la base de datos
router.put('/:cuenta', function(req, res, next) {
  cooperativasControllers.editar(req.body, req.params.cuenta)
  .then((respuesta) => {
    res.status(201).json({
      mensaje: respuesta.mensaje,
      grupo_editado: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Agregar Usuario a Grupo de Cooperativa
// Ya esta vinculado a la base de datos
router.post('/:usuario/:cooperativa', function(req, res, next) {
  cooperativasControllers.relacionar(req.params.usuario, req.params.cooperativa)
  .then((respuesta) => {
    res.status(201).json({
      mensaje: respuesta.mensaje,
      relacion_creada: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Mostrar proxima fecha de pago de una cooperativa
// Ya esta vinculado a la base de datos
router.get('/:cuenta', function(req, res, next) {
  cooperativasControllers.proxima(req.params.cuenta)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      fecha_proxima: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Eliminar relacion de usuario con cooperativa
// Ya esta vinculado a la base de datos
router.delete('/eliminar-relacion/:usuario/:cooperativa', function(req, res, next) {
  cooperativasControllers.eliminarRelacion(req.params.usuario, req.params.cooperativa)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      relacion_eliminada: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Eliminar Grupo de Cooperativa
// Ya esta vinculado a la base de datos
router.delete('/:grupo', function(req, res, next) {
  cooperativasControllers.eliminar(req.params.grupo)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      grupo_eliminado: respuesta.data
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
