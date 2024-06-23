const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PrestamosSchema = new Schema({
    id: ObjectId,
    balance: {
        type: Number
    },
    interes: {
        type: Number
    },
    tasa_interes: {
        type: Number
    },
    deuda: {
        type: Number
    },
    usuario: {
        type: String
    },
    fecha_pagar: {
        type: String
    },
});

const PrestamosModel = mongoose.model('prestamos', PrestamosSchema)
module.exports = PrestamosModel