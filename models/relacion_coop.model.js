const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const RelacionSchema = new Schema({
    id: ObjectId,
    usuario: {
        type: String
    },
    grupo_cooperativa: {
        type: String
    },
    cuotas_pagadas: {
        type: Number
    },
});

const RelacionCooperativasModel = mongoose.model('relacion-cooperativas', RelacionSchema)
module.exports = RelacionCooperativasModel