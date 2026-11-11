/*
Declara un objeto `temporizador` con las propiedades `segundos: 0` y `etiqueta: "Reloj"`. Añade dos métodos:
1. Un método tradicional `iniciar()` que ejecute una función donde `this.segundos` se incremente[10][11].
2. Un método con función flecha (`arrow function`) `mostrar()` que intente imprimir `this.etiqueta`
*/

const temporizador = {
    segundos : 0,
    etiqueta: "Reloj",

    iniciar: function() {
        this.segundos++;
        console.log(`Segundos: ${this.segundos}`);
    },

    mostrar: () => {
        console.log(`Etiqueta: ${this.etiqueta}`);
    }
};

temporizador.iniciar();
temporizador.mostrar();