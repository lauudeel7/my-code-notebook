/*
Crea una estructura de array que almacene los nombres de herramientas de un taller. Implementa un script que:
1. Busque si la herramienta `"Llave inglesa"` existe en el array con `.includes()`[1][2].
2. Si existe, obtenga su índice con `.findIndex()` o `.indexOf()` y la reemplace por `"Llave dinamométrica"` mediante `.splice()`[1].
3. Formatee el array final en una sola cadena de texto separada por guiones (`" - "`) con `.join()`
*/

const inventarioTaller = ["Martillo", "Destornillador", "Llave inglesa", "Alicates"];

if (inventarioTaller.includes("Llave inglesa")){
    const indice = inventarioTaller.indexOf("Llave inglesa");
    inventarioTaller.splice(indice, 1, "Llave dinamométrica");
    console.log("Se ha reemplazado la herramienta.");
}else {
    console.log("La herramienta no se encuentra en el inventario.");
}

const inverntarioFormateado = inventarioTaller.join(" - ");
console.log("Inventario final:", inverntarioFormateado);