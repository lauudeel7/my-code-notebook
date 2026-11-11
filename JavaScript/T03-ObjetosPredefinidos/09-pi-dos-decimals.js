/*
Crea una funció que torne el número PI amb dos decimals. Utilitza la variable PI que ja existix en javascript
*/

function obtindrePiDosDecimals() {
    return parseFloat(Math.PI.toFixed(2));
}

console.log("Número PI amb 2 decimals:", obtindrePiDosDecimals());