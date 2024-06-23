const { busqueda } = require("../database/busqueda");
const { cuentas_prestamos, usuarios } = require("../database/db");
const { fecha_mensual } = require("../database/fechas");
const { v4: uuidv4 } = require('uuid');

class PrestamosC {
    mostrar() {
        return new Promise((resolve, reject) => {
            try {
                if (cuentas_prestamos.length === 0) {
                    return resolve("No hay registrado ninguna cuenta de prestamos")
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
        return new Promise((resolve, reject) => {
            try {
                let {balance, interes, usuario} = cuenta_nueva;
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
                    id: uuidv4(),
                    fecha_pagar: fecha_mensual()
                }
                cuentas_prestamos.push(nuevo);
                return resolve({
                    mensaje: "Se completo la peticion para agregar cuenta de prestamos",
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
                let {error, data, id} = busqueda(cuentas_prestamos, cuenta)
                let {balance, interes, deuda} = edicion
                if (!balance || !interes || !deuda) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                if (error) {
                    return reject("No existe la cuenta")
                }
                data.balance = Number(balance)
                data.interes = Number(interes)
                data.tasa_interes = Number((((Number(interes) / 100) / 360) * Number(balance)).toFixed(2))
                data.deuda = Number(deuda)
                cuentas_prestamos.splice(id, 1);
                cuentas_prestamos.push(data);
                return resolve({
                    mensaje: "Peticion realizado con exito para editar la cuenta de prestamos",
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
                let {error, data, id} = busqueda(cuentas_prestamos, cuenta)
                if (error) {
                    return reject("No existe la cuenta")
                }
                cuentas_prestamos.splice(id, 1);
                return resolve({
                    mensaje: "Completado con exito la peticion de eliminar cuenta",
                    data: data
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new PrestamosC();