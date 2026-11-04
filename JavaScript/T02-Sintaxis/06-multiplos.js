/*
 * 🎯 Enunciado
Un script que escriba els números de l'1 al 50, que indique quals són múltiples de 4 i de 9 i que
cada 5 línies mostre una línia horitzontal. 
 */

for (let i = 1; i <= 50; i++) {
  if (i % 4 === 0) {
    console.log(i + " (Múltiplo de 4)");
  } else if (i % 9 === 0) {
    console.log(i + " (Múltiplo de 9)");
  } else {
    console.log(i);
  }
  if (i % 5 === 0) {
    console.log('————————————————————')
  }

}
