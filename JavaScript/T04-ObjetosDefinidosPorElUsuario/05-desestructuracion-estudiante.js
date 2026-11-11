/*
Dado un objeto que representa la ficha de un estudiante:
* Extrae el `id` y asigna a `nombre` un alias `nombreAlumno` mediante desestructuración anidada[17][18].
* Escribe una función `procesarEstudiante({ id, datosPersonales: { nombre } })` que reciba directamente las propiedades desestructuradas en sus parámetros y devuelva un saludo personalizado[18].
*/

const estudiante = {
  id: 101,
  datosPersonales: { nombre: "Ana", apellido: "Martínez" },
  calificaciones: [8, 9, 7.5],
};

const {
    id,
    datosPersonales: {nombre: nombreAlumno}
} = estudiante;

console.log(`ID: ${id}, Alumno: ${nombreAlumno}`);

function procesarEstudiante({id, datosPersonales:{nombre}}){
    return `Hola ${nombre}, tu ID de estudiante registrado es ${id}.`;
}

const saludo = procesarEstudiante(estudiante);
console.log(saludo);