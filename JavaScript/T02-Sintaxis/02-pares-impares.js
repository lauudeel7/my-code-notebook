/*
 * 🎯 Enunciado
 * Utilitzant l’estructura for, crear un script que ens diga si un nombre
 *  sencer sol·licitat al usuari es un nombre primer i parell o imparell.
 */

let num
do {
  num = parseInt(
    prompt(
      'Introduce un número entero para verificar si es primo y par o impar:'
    )
  )
} while (isNaN(num) || num < 0)

let esPrimo = true

for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) {
        esPrimo = false;
        break
    }
}

if (esPrimo && num > 1) {
  console.log(num + ' es un número primo.')
} else {
  console.log(num + ' no es un número primo.')
}

if (num % 2 === 0) {
  console.log(num + ' es un número par.')
} else {
  console.log(num + ' es un número impar.')
}
