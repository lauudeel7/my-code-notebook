/*
 * 🎯 Enunciado
Realitza un script que demane nombre de files i columnes i escriba una taula. Dins cada una de les
cel·les haurà d'escriure's un número consecutiu en orde descendent. Si, per exemple, la taula és de
7×5 els números aniran del 35 a l'1
 */

let filas = parseInt(prompt("Introduce el número de filas: "));
let columnas = parseInt(prompt("Introduce el número de columnas: "));

let num = filas * columnas;

document.write("<table border 1>");

for (let i = 1; i <= filas; i++ ){
    document.write("<tr>")

    for (let j = 1; j <= columnas; i++) {
        document.write("<td>"+num+"</td>");
        num--;
    }
    document.write("</tr>")
}

document.write("</table>")