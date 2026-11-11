/*
Diseña una función `crearContador(valorInicial)` que retorne un objeto con tres funciones 
anidadas (métodos): `incrementar()`, `decrementar()` y `obtenerValor()`[14][15]. La variable 
`valorInicial` debe ser completamente privada y no accesible directamente desde fuera
*/

function crearContador(valorInicial) {
  let contador = valorInicial;

  return {
    incrementar: function () {
      contador++;
      return contador;
    },
    decrementar: function () {
      contador--;
      return contador;
    },
    obtenerValor: function () {
      return contador;
    },
  };
}

const miContador = crearContador(10);
console.log(miContador.incrementar());
console.log(miContador.incrementar());
console.log(miContador.decrementar());
console.log(miContador.obtenerValor());
console.log(miContador.contador);