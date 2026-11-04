/*
 * 🎯 Enunciado
Crea un script per a generar piràmide següent amb els números de l'1 al número que indique l'usuari
(no major de 50)
1
12
123
1234
12345
123456
 */

do {
  num = parseInt(prompt('Introduce un número entero para hacer una pirámide:'))
} while (isNaN(num) || num < 1 || num > 50)

for (let i = 1; i <= num; i++) {
  let fila = ''
  for (let j = 1; j <= i; j++) {
    fila += j
  }
  console.log(fila)
}