const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AhorrosSchema = new Schema({
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
    usuario: {
        type: String
    },
});

const AhorrosModel = mongoose.model('ahorros', AhorrosSchema)
module.exports = AhorrosModel