const { busqueda } = require("../database/busqueda");
const { cuentas_ahorro, usuarios } = require("../database/db");
const { v4: uuidv4 } = require('uuid');

class AhorrosC {
    mostrar() {
        return new Promise((resolve, reject) => {
            try {
                if (cuentas_ahorro.length === 0) {
                    return resolve("No hay registrado ninguna cuenta de ahorro")
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
        return new Promise((resolve, reject) => {
            try {
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
                    usuario: usuario,
                    id: uuidv4()
                }
                cuentas_ahorro.push(nuevo);
                return resolve({
                    mensaje: "Se completo la peticion para agregar cuenta de ahorro",
                    data: nuevo
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Peticion para editar
    editar(edicion, cuenta) {
        return new Promise((resolve, reject) => {
            try {
                let { error, data, id } = busqueda(cuentas_ahorro, cuenta)
                console.log(data)
                let { balance, interes } = edicion
                if (!balance || !interes) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                if (error) {
                    return reject("No existe la cuenta")
                }
                data.balance = Number(balance)
                data.interes = Number(interes)
                data.tasa_interes = Number((((Number(interes) / 100) / 360) * Number(balance)).toFixed(2))
                cuentas_ahorro.splice(id, 1);
                cuentas_ahorro.push(data);
                return resolve({
                    mensaje: "Peticion realizado con exito para editar la cuenta de ahorros",
                    data: data
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    //Eliminar Cuenta
    eliminar(cuenta) {
        return new Promise((resolve, reject) => {
            try {
                let { error, data, id } = busqueda(cuentas_ahorro, cuenta)
                if (error) {
                    return reject("No existe la cuenta")
                }
                cuentas_ahorro.splice(id, 1);
                return resolve({
                    mensaje: "Completado con exito la peticion de eliminar la cuenta de ahorro",
                    data: data
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new AhorrosC();