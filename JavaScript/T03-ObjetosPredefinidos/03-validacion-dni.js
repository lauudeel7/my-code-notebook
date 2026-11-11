/*El càlcul de la lletra del DNI es fa obtenint el mòdul del número del DNI entre 23 i accedint al valor
d’aquesta posició en aquest array :
['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B','N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
Utilitzant la funció prompt() demanar a l’usuari que introduïsca el DNI amb la lletra inclosa.
S’ha d’obtindre el nombre i la lletra del DNI proporcionat per l’usuari i comprovar que és correcte
S’ha de comprovar també que el DNI introduït per l’usuari sembla un DNI correcte. 
 */

const lletresDNI = [
  "T",
  "R",
  "W",
  "A",
  "G",
  "M",
  "Y",
  "F",
  "P",
  "D",
  "X",
  "B",
  "N",
  "J",
  "Z",
  "S",
  "Q",
  "V",
  "H",
  "L",
  "C",
  "K",
  "E",
];

const DNIinput = prompt("Introdueix el número d'un DNI amb la lletra:");

if (!DNIinput || DNIinput.trim() === "") {
  console.log("No s'ha introduït cap dada.");
} else {
  const regexDNI = /^\d{8}[A-Za-z]$/;

  if (!regexDNI.test(dniInput.trim())) {
    console.log(
      "El DNI introduït no té un format vàlid (ha de tindre 8 números i 1 lletra).",
    );
  } else {
    const num = parseInt(DNIinput.slice(0, 8), 10);
    const lletraUsuari = DNIinput.slice(-1).toUpperCase();
    const lletraCorr = lletresDNI[num % 23];

    if (lletraUsuari === lletraCorr) {
      console.log(`DNI correcte! La lletra calculada és ${lletraCorr}.`);
    } else {
      console.log(
        `DNI incorrecte. La lletra introduïda és ${lletraUsuari}, però hauria de ser ${lletraCorr}.`,
      );
    }
  }
}
