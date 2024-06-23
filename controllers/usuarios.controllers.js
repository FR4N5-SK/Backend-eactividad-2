const UsuaiosModel = require('../models/usuarios.model');
const AhorrosModel = require('../models/ahorros.model');
const CooperativasModel = require('../models/cooperativas.model');
const RelacionCooperativasModel = require('../models/relacion_coop.model');
const PrestamosModel = require('../models/prestamos.model');

class UsuariosC {
    mostrar() {
        return new Promise(async (resolve, reject) => {
            try {
                const usuarios = await UsuaiosModel.find().select(
                    '_id nombre apellido usuario clave'
                )
                if (usuarios.length === 0) {
                    return resolve("No hay registrado ningun usuario")
                }
                return resolve({
                    mensaje: "Peticion de mostrar usuarios completada",
                    data: usuarios
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    //metodo para crear usuarios
    crear(usuario_nuevo) {
        return new Promise(async (resolve, reject) => {
            try {
                const usuarios = await UsuaiosModel.find().select(
                    '_id nombre apellido usuario clave'
                )
                let { nombre, apellido, clave, usuario } = usuario_nuevo;
                if (!nombre || !apellido || !clave || !usuario) {
                    return reject("Revisa nuevamente el manuel, te falta propiedades")
                }
                for (let i = 0; i < usuarios.length; i++) {
                    if (usuarios[i].usuario === usuario) {
                        return reject("Ya existe el usuario")
                    }
                }
                let nuevo = {
                    nombre: nombre,
                    apellido: apellido,
                    clave: clave,
                    usuario: usuario
                }
                const usuarioCreado = await UsuaiosModel.create(nuevo)
                if (!usuarioCreado) {
                    return reject('Hubo un error al crear el nuevo usuario')
                }
                return resolve({
                    mensaje: "Se completo la peticion para agregar usuario",
                    data: usuarioCreado
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Peticion para editar
    editar(edicion, usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                const usuarioBuscado = await UsuaiosModel.findOne({
                    usuario: usuario
                })
                let { nombre, apellido, clave } = edicion
                if (!nombre || !apellido || !clave) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                if (!usuarioBuscado) {
                    return reject("No existe el usuario")
                }
                let nuevo = {
                    nombre: nombre,
                    apellido: apellido,
                    clave: clave
                }
                const usuarioEditado = await UsuaiosModel.updateOne({ _id: usuarioBuscado._id }, { $set: nuevo })
                if (!usuarioEditado) {
                    return reject('Hubo un error al editar el usuario')
                }
                return resolve({
                    mensaje: "Peticion realizado con exito para editar usuario",
                    data: usuarioBuscado
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    cuentas(usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                let ahorros = await AhorrosModel.find({
                    usuario: usuario
                }).select(
                    '_id balance interes tasa_interes usuario'
                )
                let prestamos = await PrestamosModel.find({
                    usuario: usuario
                }).select(
                    '_id balance interes tasa_interes deuda usuario fecha_pagar'
                )
                let cooperativas = await RelacionCooperativasModel.find({
                    usuario: usuario
                }).select(
                    '_id grupo_cooperativa usuario cuotas_pagadas'
                )
                if (ahorros.length === 0) {
                    ahorros = "El usuario no tiene cuenta de ahorro"
                }
                if (prestamos.length === 0) {
                    prestamos = "El usuario no tiene cuenta de prestamos"
                }
                if (cooperativas.length === 0) {
                    cooperativas = "El usuario no tiene relacion con ninguna cooperativa"
                }
                let cuentas = {
                    ahorro: ahorros,
                    prestamo: prestamos,
                    cooperativas: cooperativas
                }
                return resolve({
                    mensaje: "Se completo con exito la peticion de ver las cuentas de un usuario",
                    data: cuentas
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    resumen() {
        return new Promise(async (resolve, reject) => {
            try {
                const cuentas_ahorro = await AhorrosModel.find().select(
                    '_id balance interes tasa_interes usuario'
                )
                const grupos_cooperativas = await CooperativasModel.find().select(
                    '_id balance pago_cuotas cuotas_totales dias_entre_cuotas fechas'
                )
                const cuentas_prestamos = await PrestamosModel.find().select(
                    '_id balance interes tasa_interes deuda usuario fecha_pagar'
                )
                let balance_aho = 0
                let interes_aho = 0
                let balance_pre = 0
                let interes_pre = 0
                let balance_coo = 0
                let promedio = 0
                let resumen = {
                    ahorro: {
                        balance_total: 0,
                        interes_promedio: 0,
                        tasa_promedio: 0
                    },
                    prestamos: {
                        balance_total: 0,
                        interes_promedio: 0,
                        tasa_promedio: 0
                    },
                    cooperativas: {
                        balance_total: 0
                    }
                }
                for (let i = 0; i < cuentas_ahorro.length; i++) {
                    balance_aho = balance_aho + cuentas_ahorro[i].balance
                    interes_aho = interes_aho + cuentas_ahorro[i].interes
                    promedio = promedio + 1
                }
                resumen.ahorro.balance_total = balance_aho;
                resumen.ahorro.interes_promedio = interes_aho;
                resumen.ahorro.tasa_promedio = Number(((resumen.ahorro.interes_promedio / 100) / 360) * balance_aho).toFixed(2);
                promedio = 0
                for (let i = 0; i < cuentas_prestamos.length; i++) {
                    balance_pre = balance_pre + cuentas_prestamos[i].balance
                    interes_pre = interes_pre + cuentas_prestamos[i].interes
                    promedio = promedio + 1
                }
                resumen.prestamos.balance_total = balance_pre;
                resumen.prestamos.interes_promedio = interes_pre;
                resumen.prestamos.tasa_promedio = Number(((resumen.prestamos.interes_promedio / 100) / 360) * balance_pre).toFixed(2);
                for (let i = 0; i < grupos_cooperativas.length; i++) {
                    balance_coo = balance_coo + grupos_cooperativas[i].balance
                }
                resumen.cooperativas.balance_total = balance_coo
                return resolve({
                    mensaje: "Peticion completada con exito, ver resumen por tipo de cuenta",
                    data: resumen
                })
            } catch (error) {

            }
        })
    }

    //Eliminar usuario
    eliminar(usuario) {
        return new Promise(async (resolve, reject) => {
            try {
                const usuarioBuscado = await UsuaiosModel.findOne({ usuario: usuario })
                const ahorroBuscado = await AhorrosModel.findOne({ usuario: usuario })
                const prestamoBuscado = await PrestamosModel.findOne({ usuario: usuario })
                const cooperativaBuscado = await RelacionCooperativasModel.find({ usuario: usuario })
                if (!usuarioBuscado) {
                    return reject("No existe el usuario")
                }
                if (ahorroBuscado) {
                    await AhorrosModel.findByIdAndDelete(ahorroBuscado._id)
                }
                if (prestamoBuscado) {
                    await PrestamosModel.findByIdAndDelete(prestamoBuscado._id)
                }
                if (cooperativaBuscado.length > 0) {
                    await RelacionCooperativasModel.deleteMany({ usuario: usuario })
                }
                const usuarioEliminado = await UsuaiosModel.findByIdAndDelete(usuarioBuscado._id)
                if (!usuarioEliminado) {
                    return reject('Hubo un error al eliminar el Usuario')
                }
                return resolve({
                    mensaje: "Completado con exito la peticion de eliminar el usuario",
                    data: usuario
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new UsuariosC();