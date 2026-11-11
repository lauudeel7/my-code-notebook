/*
Crea una aplicación para gestionar una colección de libros representada por un array de objetos:
Escribe un módulo o conjunto de funciones que realice:

* `obtenerDisponibles(lista)`: Filtra los libros cuyo atributo `prestado` sea `false` utilizando `.filter()` y desestructuración en los parámetros[1][18].
* `ordenarPorPaginas(lista, ascendente = true)`: Ordena los libros por el número de páginas de menor a mayor (o de mayor a menor según el parámetro booleano) mediante una función de comparación en `.sort()`[4][22].
* `generarResumenes(lista)`: Retorna un nuevo array de cadenas de texto con la estructura `"{titulo} ({paginas} págs.)"` usando `.map()` y *template literals*
*/

const catalogo = [
  { id: 1, titulo: "JavaScript Eloquente", paginas: 472, prestado: false },
  { id: 2, titulo: "DOM y BOM Avanzado", paginas: 210, prestado: true },
  { id: 3, titulo: "Estructuras de Datos", paginas: 350, prestado: false },
];

function obtenerDisponibles(lista){
    return lista.filter(({ prestado }) => !prestado);
}

function ordenarPorPaginas(lista, ascendente = true){
    return lista.toSorted((a, b) =>
    ascendente ? a.paginas - b.paginas : b.paginas - a.paginas
    );
}

function generarResumenes(lista){
    return lista.map(({ titulo, paginas }) => `${titulo} (${paginas} págs.)` );
}

console.log("--- LIBROS DISPONIBLES ---");
console.log(obtenerDisponibles(catalogo));

console.log("\n--- ORDENADOS POR PÁGINAS (ASCENDENTE) ---");
console.log(ordenarPorPaginas(catalogo, true));

console.log("\n--- RESÚMENES DE CATÁLOGO ---");
console.log(generarResumenes(catalogo));