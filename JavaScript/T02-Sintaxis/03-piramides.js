/*
 * 🎯 Enunciado
 * Realitza un script que escriba una piràmide de l'1 al 30 de la manera següent :
1
22
333
4444
55555
666666
 */

for (let i = 1; i <= 30; i++) {
  let fila = ''
  for (let j = 1; j <= i; j++) {
    fila += i
  }
  console.log(fila)
}