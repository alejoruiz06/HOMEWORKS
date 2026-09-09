const numeros = [1, 2, 3, 4, 5];

console.log("Array:", numeros);

console.log("at:", numeros.at(2));

const numeros2 = [6, 7, 8];
console.log("concat:", numeros.concat(numeros2));

let copia = [1, 2, 3, 4, 5];
copia.copyWithin(0, 3);
console.log("copyWithin:", copia);

console.log("entries:");
for (let entrada of numeros.entries()) {
    console.log(entrada);
}

console.log("every:", numeros.every(n => n > 0));

let lleno = [1, 2, 3, 4, 5];
lleno.fill(0, 1, 3);
console.log("fill:", lleno);

console.log("filter:", numeros.filter(n => n % 2 === 0));

console.log("find:", numeros.find(n => n > 3));

console.log("findIndex:", numeros.findIndex(n => n > 3));

console.log("findLast:", numeros.findLast(n => n % 2 === 0));

console.log(
    "findLastIndex:",
    numeros.findLastIndex(n => n % 2 === 0)
);

const anidado = [1, [2, 3], [4, [5, 6]]];
console.log("flat:", anidado.flat());
console.log("flat 2:", anidado.flat(2));

console.log(
    "flatMap:",
    numeros.flatMap(n => [n, n * 2])
);

console.log("forEach:");
numeros.forEach(n => console.log(n));

console.log("includes:", numeros.includes(3));

console.log("indexOf:", numeros.indexOf(3));

console.log("join:", numeros.join(" - "));

console.log("keys:");
for (let key of numeros.keys()) {
    console.log(key);
}

const repetidos = [1, 2, 3, 2, 5, 2];
console.log("lastIndexOf:", repetidos.lastIndexOf(2));

console.log(
    "map:",
    numeros.map(n => n * 2)
);

let listaPop = [1, 2, 3, 4];
console.log("pop:", listaPop.pop());
console.log(listaPop);

let listaPush = [1, 2, 3];
listaPush.push(4);
console.log("push:", listaPush);

console.log(
    "reduce:",
    numeros.reduce((total, n) => total + n, 0)
);

console.log(
    "reduceRight:",
    numeros.reduceRight((total, n) => total + n, 0)
);

let invertido = [1, 2, 3, 4, 5];
invertido.reverse();
console.log("reverse:", invertido);

let listaShift = [1, 2, 3, 4];
console.log("shift:", listaShift.shift());
console.log(listaShift);

console.log("slice:", numeros.slice(1, 4));

console.log(
    "some:",
    numeros.some(n => n > 4)
);

let ordenados = [5, 2, 10, 1, 8];
ordenados.sort((a, b) => a - b);
console.log("sort:", ordenados);

let listaSplice = [1, 2, 3, 4, 5];
listaSplice.splice(2, 1, 10);
console.log("splice:", listaSplice);

console.log(
    "toString:",
    numeros.toString()
);

console.log(
    "toLocaleString:",
    numeros.toLocaleString()
);

let listaUnshift = [2, 3, 4];
listaUnshift.unshift(1);
console.log("unshift:", listaUnshift);

console.log("values:");
for (let value of numeros.values()) {
    console.log(value);
}

console.log("length:", numeros.length);

console.log("constructor:", numeros.constructor);