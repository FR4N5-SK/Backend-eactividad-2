const UsuaiosModel = require('../models/usuarios.model');
const AhorrosModel = require('../models/ahorros.model');


class AhorrosC {
    mostrar() {
        return new Promise(async (resolve, reject) => {
            try {
                const cuentas_ahorro = await AhorrosModel.find().select(
                    '_id balance interes tasa_interes usuario'
                )
                if (cuentas_ahorro.length === 0) {
                    return reject("No hay registrado ninguna cuenta de ahorro")
                }
                return resolve({
                    mensaje: "Peticion de mostrar cuentas de ahorro completada",
                    data: cuentas_ahorro
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    //metodo para crear cuenta ahorro
    crear(cuenta_nueva) {
        return new Promise(async (resolve, reject) => {
            try {
                const cuentas_ahorro = await AhorrosModel.find().select(
                    '_id balance interes tasa_interes usuario'
                )
                const usuarios = await UsuaiosModel.find().select(
                    '_id nombre apellido usuario clave'
                )
                let { balance, interes, usuario } = cuenta_nueva;
                if (!balance || !interes || !usuario) {
                    return reject("Revisa nuevamente el manuel, te falta propiedades")
                }
                for (let i = 0; i < cuentas_ahorro.length; i++) {
                    if (cuentas_ahorro[i].usuario === usuario) {
                        return reject("Ya el usuario tiene una cuenta de ahorro usuario")
                    }
                }
                let error = true
                for (let i = 0; i < usuarios.length; i++) {
                    if (usuarios[i].usuario === usuario) {
                        error = false
                    }
                }
                if (error) {
                    return reject("No existe el usuario")
                }
                let nuevo = {
                    balance: Number(balance),
                    interes: Number(interes),
                    tasa_interes: Number((((Number(interes) / 100) / 360) * Number(balance)).toFixed(2)),
                    usuario: usuario
                }
                const cuentaCreada = await AhorrosModel.create(nuevo)
                if (!cuentaCreada) {
                    return reject('Hubo un error al crear la nueva cuenta de ahorro')
                }
                return resolve({
                    mensaje: "Se completo la peticion para agregar cuenta de ahorro",
                    data: cuentaCreada
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Peticion para editar
    editar(edicion, cuenta) {
        return new Promise(async (resolve, reject) => {
            try {
                const cuentaBuscada = await AhorrosModel.findOne({
                    _id: cuenta
                })
                let { balance, interes } = edicion
                if (!balance || !interes) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                if (!cuentaBuscada) {
                    return reject("No existe la cuenta")
                }
                const nuevo = {
                    balance: Number(balance),
                    interes: Number(interes),
                    tasa_interes: Number((((Number(interes) / 100) / 360) * Number(balance)).toFixed(2))
                }
                const cuentaEditada = await AhorrosModel.updateOne({ _id: cuenta }, { $set: nuevo })
                if (!cuentaEditada) {
                    return reject('Hubo un error al editar la cuenta')
                }
                return resolve({
                    mensaje: "Peticion realizado con exito para editar la cuenta de ahorros",
                    data: cuentaBuscada
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    //Eliminar Cuenta
    eliminar(cuenta) {
        return new Promise(async (resolve, reject) => {
            try {
                const cuentaBuscada = await AhorrosModel.findOne({
                    _id: cuenta
                })
                if (!cuentaBuscada) {
                    return reject("No existe la cuenta")
                }
                const cuentaEliminada = await AhorrosModel.findByIdAndDelete(cuenta)
                if (!cuentaEliminada) {
                    return reject('Hubo un error al eliminar la cuenta')
                }
                return resolve({
                    mensaje: "Completado con exito la peticion de eliminar la cuenta de ahorro",
                    data: cuentaBuscada
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new AhorrosC();