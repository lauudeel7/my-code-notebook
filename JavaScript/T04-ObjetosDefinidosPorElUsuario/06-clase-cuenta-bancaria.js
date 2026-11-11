/*
Construye una clase `CuentaBancaria` en sintaxis ES6 que contenga:
1. Un atributo privado `#saldo` inicializado en el constructor.
2. Un *getter* `saldo` que devuelva la cantidad formateada con 2 decimales mediante `.toFixed(2)`.
3. Un *setter* `ingresar` que valide que la cantidad sea un número positivo antes de sumar al saldo
*/

class CuentaBancaria {
    #saldo;

    constructor(saldoInicial = 0){
        this.#saldo = saldoInicial > 0 ? saldoInicial : 0;
    }

    get saldo() {
        return this.#saldo.toFixed(2);
    }

    set ingresar(cantidad){
        if (typeof cantidad === "number" && cantidad > 0){
            this.#saldo += cantidad;
            console.log(`Ingreso correcto: +${cantidad.toFixed(2)}€`);
        }else{
            console.log("Error: La cantidad a ingresar debe ser un número positivo.");
        }
    }
}

const miCuenta = new CuentaBancaria(150.5);
console.log("Saldo actual:", miCuenta.saldo);

miCuenta.ingresar = 50;
console.log("Saldo tras ingreso:", miCuenta.saldo);

miCuenta.ingresar = -20;

