function ejecutarEjercicio() {
    const selector = document.getElementById("ejercicio");
    const archivo = selector.value;
    const consola = document.getElementById("consola");

    consola.textContent = "Ejecutando " + archivo + "...\n\n";

    // Sobrescribimos console.log para volcar las salidas en el <pre>
    console.log = function (...mensajes) {
        consola.textContent += mensajes.map(msg => 
            typeof msg === "object" ? JSON.stringify(msg, null, 2) : msg
        ).join(" ") + "\n";
    };

    // Eliminamos el script previo si existe
    const scriptAnterior = document.getElementById("ejercicioActual");
    if (scriptAnterior) {
        scriptAnterior.remove();
    }

    // Cargamos el ejercicio desde el directorio actual
    const script = document.createElement("script");
    script.id = "ejercicioActual";
    script.src = "./" + archivo + "?t=" + Date.now();

    script.onload = function () {
        consola.textContent += "\n\n[¡Ejercicio cargado y ejecutado con éxito!]";
    };

    script.onerror = function () {
        consola.textContent += "\n\n[Error al cargar el archivo de ejercicio. Comprueba que exista en la misma carpeta.]";
    };

    document.body.appendChild(script);
}