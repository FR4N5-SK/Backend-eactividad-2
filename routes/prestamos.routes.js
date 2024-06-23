var express = require('express');
const prestamosControllers = require('../controllers/prestamos.controllers');
var router = express.Router();

// Mostrar todas las cuentas de prestamos
// Ya esta vinculado a la base de datos
router.get('/', function(req, res, next) {
  prestamosControllers.mostrar()
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

// Agregar Cuenta Prestamo
// Ya esta vinculado a la base de datos
router.post('/', function(req, res, next) {
  prestamosControllers.crear(req.body)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      cuenta_creada: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Editar Cuenta Prestamo
// Ya esta vinculado a la base de datos
router.put('/:cuenta', function(req, res, next) {
  prestamosControllers.editar(req.body, req.params.cuenta)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      cuenta_editada: respuesta.data
    })
  })
  .catch((error) => {
    res.status(400).json({
      status: "400",
      mensaje: error
    })
  })
});

// Eliminar Cuenta Prestamo
// Ya esta vinculado a la base de datos
router.delete('/:cuenta', function(req, res, next) {
  prestamosControllers.eliminar(req.params.cuenta)
  .then((respuesta) => {
    res.status(200).json({
      mensaje: respuesta.mensaje,
      cuenta_eliminada: respuesta.data
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
