const { busqueda, busqueda2 } = require("../database/busqueda");
const { usuarios, cuentas_ahorro, cuentas_prestamos, grupos_cooperativas, relacion_cooperativas } = require("../database/db");

class UsuariosC {
    mostrar() {
        return new Promise((resolve, reject) => {
            try {
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
        return new Promise((resolve, reject) => {
            try {
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
                usuarios.push(nuevo);
                return resolve({
                    mensaje: "Se completo la peticion para agregar usuario",
                    data: nuevo
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Peticion para editar
    editar(edicion, usuario) {
        return new Promise((resolve, reject) => {
            try {
                let { error, data, id } = busqueda(usuarios, usuario)
                let { nombre, apellido, clave } = edicion
                if (!nombre || !apellido || !clave) {
                    return reject("Revisa nuevamente el manual, te falta propiedades")
                }
                if (error) {
                    return reject("No existe el usuario")
                }
                data.nombre = nombre
                data.apellido = apellido
                data.clave = clave
                usuarios.splice(id, 1);
                usuarios.push(data);
                return resolve({
                    mensaje: "Peticion realizado con exito para editar usuario",
                    data: data
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    cuentas(usuario) {
        return new Promise((resolve, reject) => {
            try {
                let ahorros = busqueda2(cuentas_ahorro, usuario)
                let prestamos = busqueda2(cuentas_prestamos, usuario)
                let cooperativas = busqueda2(relacion_cooperativas, usuario)
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
        return new Promise((resolve, reject) => {
            try {
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
                resumen.prestamos.balance_total = balance_aho;
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
        return new Promise((resolve, reject) => {
            try {
                let { error, data, id } = busqueda(usuarios, usuario)
                let ahorro = busqueda(cuentas_ahorro, usuario)
                let prestamos = busqueda(cuentas_prestamos, usuario)
                let cooperativas = busqueda(relacion_cooperativas, usuario)
                if (error) {
                    return reject("No existe el usuario")
                }
                cuentas_ahorro.splice(ahorro.id, 1);
                cuentas_prestamos.splice(prestamos.id, 1);
                relacion_cooperativas.splice(cooperativas.id, 1);
                usuarios.splice(id, 1);
                return resolve({
                    mensaje: "Completado con exito la peticion de eliminar el usuario",
                    data: data
                })
            } catch (error) {
                reject(error)
            }
        })
    }
}

module.exports = new UsuariosC();