/*
 * 🎯 Enunciado
Realitza un script que mostre la sèrie de fibonacci fins a un número entre 1 i 100 comanda per teclat
 */

let num = parseInt(prompt("Introduce un número entre 1 y 100: "));

let a = 0;
let b = 1;
let sig;

while (a <= num) {
    console.log(a);

    sig = a+b;
    a = b;
    b = sig;
}