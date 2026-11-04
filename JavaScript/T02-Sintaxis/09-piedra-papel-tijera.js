/*
 * 🎯 Enunciado
Realitza un joc de Pedra Paper Tisora contra el Pc
 */

let jugador = prompt("Elige: piedra, papel o tijera").toLowerCase();

let opciones = ["piedra", "papel", "tijera"];

let pc = opciones[Math.floor(Math.random() * opciones.length)];

alert("El PC ha elegido: " + pc);

if (jugador === pc) {
  alert("¡Empate!");
} else if (
  (jugador === "piedra" && pc === "tijera") ||
  (jugador === "papel" && pc === "piedra") ||
  (jugador === "tijera" && pc === "papel")
) {
  alert("¡Has ganado!");
} else if (opciones.includes(jugador)) {
  alert("¡Has perdido!");
} else {
  alert("Opción no válida.");
}
