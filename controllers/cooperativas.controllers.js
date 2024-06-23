const { usuarios, relacion_cooperativas } = require("../database/db");
const CooperativasModel = require('../models/cooperativas.model');
const RelacionesCooperativasModel = require('../models/relacion_coop.model');
const { programacion_fechas, hoy } = require("../database/fechas");
const { busqueda } = require("../database/busqueda");

class CooperativasC {
    mostrar() {
        return new Promise(async (resolve, reject) => {
            try {
                const grupos_cooperativas = await CooperativasModel.find().select(
                    '_id balance pago_cuotas cuotas_totales dias_entre_cuotas fechas'
                )
                if (grupos_cooperativas.length === 0) {
                    return reject("No hay registrado ningun grupo de cooperativa")
                }
                return resolve({
                    mensaje: "Peticion de mostrar los grupos de cooperativas completada",
                    data: grupos_cooperativas
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    //metodo para crear grupos de cooperativa
    crear(cuenta_nueva) {
        return new Promise(async (resolve, reject) => {
            try {
                let { pago_cuotas, cuotas_totales, dias_entre_cuotas, fecha_iniciar } = cuenta_nueva;
                if (!pago_cuotas || !cuotas_totales || !dias_entre_cuotas || !fecha_iniciar) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                let nuevo = {
                    balance: 0,
                    pago_cuotas: Number(pago_cuotas),
                    cuotas_totales: Number(cuotas_totales),
                    dias_entre_cuotas: Number(dias_entre_cuotas),
                    fechas: programacion_fechas(fecha_iniciar, Number(dias_entre_cuotas), Number(cuotas_totales))
                }
                const cuentaCreada = await CooperativasModel.create(nuevo)
                if (!cuentaCreada) {
                    return reject('Hubo un error al crear lel nuevo grupo de cooperativa')
                }
                return resolve({
                    mensaje: "Se completo la peticion para agregar grupo de cooperativa",
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
                const cuentaBuscada = await CooperativasModel.findOne({
                    _id: cuenta
                })
                let { balance, pago_cuotas, cuotas_totales } = edicion
                if (!balance || !pago_cuotas || !cuotas_totales) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                if (!cuentaBuscada) {
                    return reject("No existe la cooperativa")
                }
                const nuevo = {
                    balance: Number(balance),
                    pago_cuotas: Number(pago_cuotas),
                    cuotas_totales: Number(cuotas_totales),
                    fechas: programacion_fechas(cuentaBuscada.fechas[0], Number(cuentaBuscada.dias_entre_cuotas), Number(cuotas_totales))
                }
                const cuentaEditada = await CooperativasModel.updateOne({ _id: cuenta }, { $set: nuevo })
                if (!cuentaEditada) {
                    return reject('Hubo un error al editar la cuenta')
                }
                return resolve({
                    mensaje: "Peticion realizado con exito para editar el grupo de cooperativa",
                    data: cuentaBuscada
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    relacionar(usuario, cooperativa) {
        return new Promise((resolve, reject) => {
            try {
                let res_usuario = busqueda(usuarios, usuario)
                let res_cooperativa = busqueda(grupos_cooperativas, cooperativa)
                if (res_usuario.error) {
                    return reject("No existe el usuario")
                }
                if (res_cooperativa.error) {
                    return reject("No existe la cooperativa")
                }
                let relacion = {
                    usuario: usuario,
                    grupo_cooperativa: cooperativa,
                    cuotas_pagadas: 0
                }
                relacion_cooperativas.push(relacion)
                return resolve({
                    mensaje: "Se completo con exito la peticion de relacionar cooperativa con usuario",
                    data: relacion
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    proxima(cuenta) {
        return new Promise((resolve, reject) => {
            try {
                let fecha_hoy = hoy()
                let fecha_proxima = "Ya pasaron todas las fechas de pago de la cooperativa"
                let { error, data } = busqueda(grupos_cooperativas, cuenta)
                if (error) {
                    return reject("No existe la cooperativa")
                }
                for (let i = 0; i < data.fechas.length; i++) {
                    if (data.fechas[i] >= fecha_hoy) {
                        fecha_proxima = data.fechas[i]
                        return resolve({
                            mensaje: "Se completo con exito la peticion de listar la proxima fecha de pago",
                            data: fecha_proxima
                        })
                    }
                }
                return resolve({
                    mensaje: "Se completo con exito la peticion de listar la proxima fecha de pago",
                    data: fecha_proxima
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    eliminarRelacion(usuario, cooperativa) {
        return new Promise((resolve, reject) => {
            try {
                for (let i = 0; i < relacion_cooperativas.length; i++) {
                    if (relacion_cooperativas[i].usuario === usuario && relacion_cooperativas[i].grupo_cooperativa === cooperativa) {
                        relacion_cooperativas.splice(i, 1);
                        return resolve({
                            mensaje: "Completada con exito la peticion de eliminar usuario de una cooperativa",
                            data: {
                                usuario: usuario,
                                cooperativa: cooperativa
                            }
                        })
                    }
                }
                return reject("Este usuario no esta registrado a esa cooperativa")
            } catch (error) {
                reject(error)
            }
        })
    }

    //Eliminar Cuenta
    eliminar(cuenta) {
        return new Promise(async (resolve, reject) => {
            try {
                const cuentaBuscada = await CooperativasModel.findOne({
                    _id: cuenta
                })
                const relacionesBuscada = await RelacionesCooperativasModel.find().select(
                    '_id grupo_cooperativa'
                )
                if (!cuentaBuscada) {
                    return reject("No existe el grupo de cooperativa")
                }
                if (relacionesBuscada.length > 0) {
                    await RelacionesCooperativasModel.deleteMany({grupo_cooperativa: cuentaBuscada._id})
                }
                const cuentaEliminada = await CooperativasModel.findByIdAndDelete(cuenta)
                if (!cuentaEliminada) {
                    return reject('Hubo un error al eliminar la cuenta')
                }
                return resolve({
                    mensaje: "Completado con exito la peticion de eliminar el grupo",
                    data: cuentaBuscada
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new CooperativasC();