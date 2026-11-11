/*
Crea una funció que genere 100 números aleatoris entre 1 i 1000 que no es repetisquen i després mostra'ls
per pantalla de forma ordenada
*/

function generarNumerosAleatorios(){
    const nums = [];

    while (nums.length < 100){
        const numAleatori = Math.floor(Math.random() * 1000) + 1;

        if (!nums.includes(numAleatori)) {
            nums.push(numAleatori);
        }
    }

    nums.sort((a,b) => a-b);

    console.log("100 números aleatorios ordenados (sin repetir):");
    console.log(nums.join(", "));
}

generarNumerosAleatorios();