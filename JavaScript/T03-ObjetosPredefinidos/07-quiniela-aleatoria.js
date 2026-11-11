/*
Realitza un script que imprimisca 14 resultats aleatoris d'una quiniela 1 X 2.
*/

function generarQuiniela() {
    const opcions = ["1", "X", "2"];
    const resultats = [];

    for (let i = 0; i < 14; i++){
        const rand = Math.floor(Math.random()*3);
        resultats.push(`Partit ${i + 1}: ${opcions[rand]}`);
    }
    console.log("--- QUINIELA ALEATÒRIA ---");
    console.log(resultats.join("\n"));
}

generarQuiniela();