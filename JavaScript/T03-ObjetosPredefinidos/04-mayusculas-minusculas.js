/*
Definir una funció que mostre informació sobre una cadena de text que es passa com a argument.
La funció ha de comprovar si està formada només per lletres majúscules, minúscules o per lletres
majúscules i minúscules
*/

function analitzarCadena(text){
    if (typeof text != "string" || text.length === 0){
        return "Cadena no válida.";
    }

    if (text === text.toUpperCase()){
        console.log("La cadena està formada només per majúscules");
    } else if (text === text.toLowerCase()) {
        console.log("La cadena està formada només per minúscules");
    } else {
        console.log("La cadena està formada només per majúscules i minúscules");
    }
}

// Proves
console.log(analitzarCadena("HOLA MUND"));
console.log(analitzarCadena("hola món"));
console.log(analitzarCadena("Hola Món"));
