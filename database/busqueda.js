function busqueda(array, buscado) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id === buscado) {
            return ({
                data: array[i],
                id: i,
                error: false
            })
        }
        if (array[i].usuario === buscado) {
            return ({
                data: array[i],
                id: i,
                error: false
            })
        }
    }
    return ({
        data: null,
        error: true
    })
}

function busqueda2(array, buscado) {
    let cuentas = []
    for (let i = 0; i < array.length; i++) {
        if (array[i].usuario === buscado) {
            cuentas.push(array[i])
        }
    }
    return cuentas
}

module.exports = {
    busqueda,
    busqueda2
}