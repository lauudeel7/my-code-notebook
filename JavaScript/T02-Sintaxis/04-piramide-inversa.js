/*
 * 🎯 Enunciado
Fes un script que escriba una piràmide inversa dels número 
de l'1 al número que indique l'usuari
 */

let num = parseInt(
  prompt('Introduce un número entero para hacer una pirámide:')
)

for (let i = num; i >= 1; i--) {
  let fila = ''
  for (let j = 1; j <= i; j++) {
    fila += i
  }
  console.log(fila)
}