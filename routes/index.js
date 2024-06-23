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
      res.status(400).json({
        status: "400",
        mensaje: error
      })
    })
});

/* GET home page. */
router.get('/mostrar/prestamos', function(req, res, next) {
    prestamosControllers.mostrar()
    .then((respuesta) => {
      res.render('prestamos', { data: respuesta.data})
    })
    .catch((error) => {
      res.status(400).json({
        status: "400",
        mensaje: error
      })
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

module.exports = router;
