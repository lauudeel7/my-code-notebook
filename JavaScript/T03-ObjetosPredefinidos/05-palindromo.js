/*
Definir una funció que mostre informació sobre una cadena de text que es passa com a argument.
La funció ha de comprovar si la cadena de text és un palíndrom ( Paraula o frase que és igual llegida
d'esquerra a dreta que de dreta a esquerra )
*/

function esPalíndrom(text) {
  if (typeof text != "string" || text.length === 0) {
    return "Cadena no válida.";
  }

  let sinEspacios = text.toLowerCase().replace(/\s+/g, '');
  let cadenaGirada = sinEspacios.split('').reverse().join('');

  if (sinEspacios === cadenaGirada){
    console.log("És un palíndrom");
  }else{
    console.log("No és un palíndrom");
  }
}

esPalíndrom('La ruta nos aporto otro paso natural')
esPalíndrom('Radar')
esPalíndrom('Esto no es un palíndromo')