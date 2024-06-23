const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CooperativasSchema = new Schema({
    id: ObjectId,
    balance: {
        type: Number
    },
    pago_cuotas: {
        type: Number
    },
    cuotas_totales: {
        type: Number
    },
    dias_entre_cuotas: {
        type: Number
    },
    fechas: {
        type: Array
    }
});

const CooperativasModel = mongoose.model('cooperativas', CooperativasSchema)
module.exports = CooperativasModel