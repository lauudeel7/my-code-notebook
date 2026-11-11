const valors = [true, 5, false, "hola", "adeu", 2];

// 1) Obtindre l'element de text major (per longitud)
const cadenes = valors.filter(item => typeof item === "string");
const textMajor = cadenes.reduce((max, actual) => actual.length > max.length ? actual : max, "");
console.log("1) Text major:", textMajor);

// 2) Obtindre true i false utilitzant els valors booleans
const bool1 = valors[0]; // true
const bool2 = valors[2]; // false

const resultatTrue = bool1 || bool2;  // true
const resultatFalse = bool1 && bool2; // false

console.log("2) Resultat True:", resultatTrue);
console.log("2) Resultat False:", resultatFalse);

// 3) Operacions matemàtiques amb els dos valors numèrics (5 i 2)
const num1 = valors[1]; // 5
const num2 = valors[5]; // 2

console.log("3) Suma:", num1 + num2);          // 7
console.log("3) Resta:", num1 - num2);         // 3
console.log("3) Multiplicació:", num1 * num2); // 10
console.log("3) Divisió:", num1 / num2);       // 2.5
console.log("3) Mòdul:", num1 % num2);         // 1