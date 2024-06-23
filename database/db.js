const usuarios = [
    {
        usuario: "MarioGomez",
        clave: "MarioGomez",
        nombre: "Mario",
        apellido: "Gomez"
    },
    {
        usuario: "AndresGomez",
        clave: "AndresGomez",
        nombre: "Andres",
        apellido: "Gomez"
    }
]

const cuentas_ahorro = [
    {
        balance: 600,
        interes: 10,
        tasa_interes: 0.16,
        id: "123456",
        usuario: "MarioGomez"
    },
    {
        balance: 10000,
        interes: 10,
        tasa_interes: 2.78,
        id: "1234567",
        usuario: "AndresGomez"
    }
]

const cuentas_prestamos = [
    {
        balance: 900,
        interes: 20,
        tasa_interes: 0.5,
        deuda: 1000,
        id: "12345678",
        usuario: "MarioGomez",
        fecha_pagar: "2024-12-24"
    },
    {
        balance: 12000,
        interes: 20,
        tasa_interes: 6.66,
        deuda: 4000,
        id: "123456789",
        usuario: "AndresGomez",
        fecha_pagar: "2024-06-24"
    },
]

const grupos_cooperativas = [
    {
        balance: 200,
        pago_cuotas: 100,
        cuotas_totales: 3,
        dias_entre_cuotas: 1,
        fechas: [
            "2024-07-12", "2024-07-13", "2024-07-14"
        ],
        id: '123'
    },
    {
        balance: 800,
        pago_cuotas: 400,
        cuotas_totales: 3,
        dias_entre_cuotas: 1,
        fechas: [
            "2024-09-12", "2024-09-13", "2024-09-14"
        ],
        id: '1234'
    }
]

const relacion_cooperativas = [
    {
        usuario: "MarioGomez",
        grupo_cooperativa: "123",
        cuotas_pagadas: 0
    },
    {
        usuario: "AndresGomez",
        grupo_cooperativa: "1234",
        cuotas_pagadas: 0
    },
    {
        usuario: "AndresGomez",
        grupo_cooperativa: "123",
        cuotas_pagadas: 0
    }
]

module.exports = {
    cuentas_ahorro,
    cuentas_prestamos,
    grupos_cooperativas,
    relacion_cooperativas,
    usuarios
}