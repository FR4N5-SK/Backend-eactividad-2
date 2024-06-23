var express = require('express');
const ahorrosControllers = require('../controllers/ahorros.controllers');
const prestamosControllers = require('../controllers/prestamos.controllers');
const cooperativasControllers = require('../controllers/cooperativas.controllers');
var router = express.Router();

/* GET home page. */
router.get('/mostrar/ahorros', function(req, res, next) {
    ahorrosControllers.mostrar()
    .then((respuesta) => {
      res.render('ahorros', { data: respuesta.data})
    })
    .catch((error) => {
      res.render('ahorros', { data: []})
    })
});

/* GET home page. */
router.get('/mostrar/prestamos', function(req, res, next) {
    prestamosControllers.mostrar()
    .then((respuesta) => {
      res.render('prestamos', { data: respuesta.data})
    })
    .catch((error) => {
      res.render('prestamos', { data: []})
    })
});

/* GET home page. */
router.get('/mostrar/cooperativas', function(req, res, next) {
    cooperativasControllers.mostrar()
    .then((respuesta) => {
      res.render('cooperativas', { data: respuesta.data})
    })
    .catch((error) => {
      res.status(400).json({
        status: "400",
        mensaje: error
      })
    })
});

/* Vista para elegir el tipo de entidad del Banco */
router.get('/dashboard', function(req, res, next) {
  res.render('dashboard')
});

//Vista de agregar cuenta de ahorro
router.post('/mostrar/ahorros-agregar', function(req, res, next) {
  ahorrosControllers.crear(req.body)
  .then((respuesta) => {
    res.render('pagina-ok', { mensaje: respuesta.mensaje})
    console.log(respuesta.data)
    /*res.status(201).json({
      mensaje: respuesta.mensaje,
      cuenta_creada: respuesta.data
    })*/
  })
  .catch((error) => {
    res.render('pagina-error', { mensaje: error})
  })
});

// Vista Editar cuenta de ahorros
router.post('/mostrar/ahorros-editar/:cuenta', function(req, res, next) {
  ahorrosControllers.editar(req.body, req.params.cuenta)
  .then((respuesta) => {
    res.render('pagina-ok', { mensaje: respuesta.mensaje})
    console.log(respuesta.data)
  })
  .catch((error) => {
    res.render('pagina-error', { mensaje: error})
  })
});


//Vista Eliminar cuenta de ahorros
router.get('/mostrar/ahorros-eliminar/:cuenta', function(req, res, next) {
  ahorrosControllers.eliminar(req.params.cuenta)
  .then((respuesta) => {
    res.render('pagina-ok', { mensaje: respuesta.mensaje})
    console.log(respuesta.data)
  })
  .catch((error) => {
    res.render('pagina-error', { mensaje: error})
  })
});

module.exports = router;

//Vista de agregar cuenta de prestamos
router.post('/mostrar/prestamos-agregar', function(req, res, next) {
  prestamosControllers.crear(req.body)
  .then((respuesta) => {
    res.render('pagina-ok', { mensaje: respuesta.mensaje})
    console.log(respuesta.data)
    /*res.status(201).json({
      mensaje: respuesta.mensaje,
      cuenta_creada: respuesta.data
    })*/
  })
  .catch((error) => {
    res.render('pagina-error', { mensaje: error})
  })
});

// Vista Editar cuenta de prestamos
router.post('/mostrar/prestamos-editar/:cuenta', function(req, res, next) {
  prestamosControllers.editar(req.body, req.params.cuenta)
  .then((respuesta) => {
    res.render('pagina-ok', { mensaje: respuesta.mensaje})
    console.log(respuesta.data)
  })
  .catch((error) => {
    res.render('pagina-error', { mensaje: error})
  })
});


//Vista Eliminar cuenta de prestamos
router.get('/mostrar/prestamos-eliminar/:cuenta', function(req, res, next) {
  prestamosControllers.eliminar(req.params.cuenta)
  .then((respuesta) => {
    res.render('pagina-ok', { mensaje: respuesta.mensaje})
    console.log(respuesta.data)
  })
  .catch((error) => {
    res.render('pagina-error', { mensaje: error})
  })
});

module.exports = router;
