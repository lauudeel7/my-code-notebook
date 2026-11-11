function ejecutarEjercicio() {
    const selector = document.getElementById("ejercicio");
    const archivo = selector.value;
    const consola = document.getElementById("consola");

    consola.textContent = "Ejecutando " + archivo + "...\n\n";

    // Capturamos console.log para mostrarlo dentro del <pre>
    console.log = function (...mensajes) {
        consola.textContent += mensajes.map(msg => 
            typeof msg === "object" ? JSON.stringify(msg, null, 2) : msg
        ).join(" ") + "\n";
    };

    // Eliminamos el script anterior si ya existía
    const scriptAnterior = document.getElementById("ejercicioActual");
    if (scriptAnterior) {
        scriptAnterior.remove();
    }

    // Carga directa del script al estar en la misma carpeta
    const script = document.createElement("script");
    script.id = "ejercicioActual";
    script.src = "./" + archivo + "?t=" + Date.now();

    script.onload = function () {
        consola.textContent += "\n[¡Ejercicio cargado y ejecutado con éxito!]";
    };

    script.onerror = function () {
        consola.textContent += "\n[Error al cargar el archivo de ejercicio. Verifica que el nombre sea correcto.]";
    };

    document.body.appendChild(script);
}