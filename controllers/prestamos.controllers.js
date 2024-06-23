const { busqueda } = require("../database/busqueda");
const UsuaiosModel = require('../models/usuarios.model');
const PrestamosModel = require('../models/prestamos.model');
const { fecha_mensual } = require("../database/fechas");

class PrestamosC {
    mostrar() {
        return new Promise(async (resolve, reject) => {
            try {
                const cuentas_prestamos = await PrestamosModel.find().select(
                    '_id balance interes tasa_interes deuda usuario fecha_pagar'
                )
                if (cuentas_prestamos.length === 0) {
                    return reject("No hay registrado ninguna cuenta de prestamos")
                }
                return resolve({
                    mensaje: "Peticion de mostrar las cuentas de prestamos completada",
                    data: cuentas_prestamos
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    //metodo para crear cuenta prestamos
    crear(cuenta_nueva) {
        return new Promise(async (resolve, reject) => {
            try {
                const cuentas_prestamos = await PrestamosModel.find().select(
                    '_id balance interes tasa_interes deuda usuario fecha_pagar'
                )
                const usuarios = await UsuaiosModel.find().select(
                    '_id nombre apellido usuario'
                )
                let { balance, interes, usuario } = cuenta_nueva;
                if (!balance || !interes || !usuario) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                for (let i = 0; i < cuentas_prestamos.length; i++) {
                    if (cuentas_prestamos[i].usuario === usuario) {
                        return reject("Ya el usuario tiene una cuenta de prestamo")
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
                    deuda: Number(balance),
                    tasa_interes: Number((((Number(interes) / 100) / 360) * Number(balance)).toFixed(2)),
                    usuario: usuario,
                    fecha_pagar: fecha_mensual()
                }
                const cuentaCreada = await PrestamosModel.create(nuevo)
                if (!cuentaCreada) {
                    return reject('Hubo un error al crear la nueva cuenta de prestamos')
                }
                return resolve({
                    mensaje: "Se completo la peticion para agregar cuenta de prestamos",
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
                const cuentaBuscada = await PrestamosModel.findOne({
                    _id: cuenta
                })
                let { balance, interes, deuda } = edicion
                if (!balance || !interes || !deuda) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                if (!cuentaBuscada) {
                    return reject("No existe la cuenta")
                }
                const nuevo = {
                    balance: Number(balance),
                    interes: Number(interes),
                    tasa_interes: Number((((Number(interes) / 100) / 360) * Number(balance)).toFixed(2)),
                    deuda: Number(deuda)
                }
                const cuentaEditada = await PrestamosModel.updateOne({ _id: cuenta }, { $set: nuevo })
                if (!cuentaEditada) {
                    return reject('Hubo un error al editar la cuenta')
                }
                return resolve({
                    mensaje: "Peticion realizado con exito para editar la cuenta de prestamos",
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
                const cuentaBuscada = await PrestamosModel.findOne({
                    _id: cuenta
                })
                if (!cuentaBuscada) {
                    return reject("No existe la cuenta")
                }
                const cuentaEliminada = await PrestamosModel.findByIdAndDelete(cuenta)
                if (!cuentaEliminada) {
                    return reject('Hubo un error al eliminar la cuenta')
                }
                return resolve({
                    mensaje: "Completado con exito la peticion de eliminar cuenta",
                    data: cuentaBuscada
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new PrestamosC();