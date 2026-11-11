/*
Dado un array de números enteros no ordenados con valores duplicados, escribe una función que realice las siguientes tareas:
1. Filtre únicamente los números pares mayores que 10 utilizando `.filter()`[1][2].
2. Genere un nuevo array con el cuadrado de cada número resultante empleando `.map()`.
3. Devuelva una copia ordenada de menor a mayor sin modificar el array inicial mediante `.toSorted()` o propagación con `.sort()`
*/

function procesarNumeros(numeros){
    const paresMayores10 = numeros.filter(num => num > 10 && num % 2 === 0);
    const cuadrados = paresMayores10.map(num => num ** 2);
    const ordenados = [...cuadrados].sort((a,b) => a-b);

    return ordenados;
}

// Pruebas
const entradaOriginal = [4, 12, 7, 20, 15, 8, 12, 14, 3];
const resultado = procesarNumeros(entradaOriginal);

console.log("Array original (sin mutar):", entradaOriginal);
console.log("Resultado procesado y ordenado:", resultado);