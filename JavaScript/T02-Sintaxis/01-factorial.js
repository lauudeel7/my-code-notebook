/*
 * El factorial d’un nombre sencer n és una operació matemàtica que consistix a multiplicar tots els
factors n x (n-1) x (n-2) x ... x 1 .
Utilitzant l’estructura for, crear un script que cacule el factorial d’un nombre sencer sol·licitat al
usuari.

 */

let num
let factorial = 1
do {
    num = parseInt(
        prompt('Introduce un num entero para calcular su factorial: ')
    )
} while(isNaN(num) || num < 0)

for (let i = 1; i <= num; i++){
    factorial *= i;
}
console.log(`Factorial de ${num} es ${factorial}`)

