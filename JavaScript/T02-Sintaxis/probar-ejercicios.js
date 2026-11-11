
function ejecutarEjercicio() {
    const selector = document.getElementById("ejercicio");
    const archivo = selector.value;

    const consola = document.getElementById("consola");

    consola.textContent = "Ejecutando " + archivo + "...\n";

    // Capturamos los mensajes de console.log
    console.log = function (...mensajes) {
        consola.textContent += mensajes.join(" ") + "\n";
    };

    // Cargamos el ejercicio seleccionado
    const scriptAnterior = document.getElementById("ejercicioActual");

    if (scriptAnterior) {
        scriptAnterior.remove();
    }

    const script = document.createElement("script");

    script.id = "ejercicioActual";
    script.src = "./T02-Sintaxis/" + archivo + "?t=" + Date.now();

    script.onload = function () {
        consola.textContent += "\n¡Ejercicio cargado!";
    };

    script.onerror = function () {
        consola.textContent += "\nError al cargar el ejercicio.";
    };

    document.body.appendChild(script);
}
