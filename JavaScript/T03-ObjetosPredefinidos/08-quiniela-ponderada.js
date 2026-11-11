/*
Realitza el script anterior però amb la probabilitat que isca l'1 siga del 60%, la de la X del 30% i la del 2 del
10%
*/

function generarQuinielaPonderada() {
    const resultats = [];

    for (let i = 0; i < 14; i++){
        const rand = Math.random()*100;

        let resultat = "";

        if (rand < 60) {
            resultat = "1";
        } else if (rand < 90) {
            resultat = "X"; 
        } else {
            resultat = "2"; 
        }

        resultats.push(`Partit ${i + 1}: ${resultat}`);
    }
    console.log("--- QUINIELA ALEATÒRIA ---");
    console.log(resultats.join("\n"));
}

generarQuinielaPonderada();