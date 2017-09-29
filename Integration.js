const e = 2.7182818; //Euler's constant
const pi = 3.1415936;

function pow(a, b) {
  let p = 1; //Product
  for (i = 0; i < b; i ++) {p *= a;} //Multiplying by a b times
  return p;
}

function fact(x) {
  let p = 1; //Product
  for (i = 1; i <= x; i ++) {p *= i} //Multiplying all natural numbers up to and including x
  return p;
}

function Derivative(f, p) {
  return x => (f(x + 1 / pow(10, p)) - f(x)) * pow(10, p); //An approximation of the derivative lim(h -> 0) (f(x + h) - f(x))/h = lim(t -> inf) (f(x + 1 / t) - f(x)) / (1 / t)
}

function Integral(f, p) {
  return function(a, b) {
    let deltaX = (b - a) / pow(10, p), sum = 0; //10^p number of rectangles of approximation of integral
    for (let i = 0; i <= (b - a) / deltaX; i ++) {sum += f(a + i * deltaX);} //Riemann sum
    return sum * deltaX; //Multiplying by the width, distributed into the sum
  };
}

function createPolynomial(coeff) {
  return function(x) {
    let sum = 0;
    for (let i = 0; i < coeff.length; i ++) {sum += coeff[i] * pow(x, i);} //The polynomial with coefficients in coeff
    return sum;
  };
}

let sinMac = new Array; //Maclaurin expansion coefficents for sin
let cosMac = new Array; //Maclaurin expansion coefficients for cos
let eMac = new Array; //Maclaurin expansion coefficients for e^x

//Creating the coefficients
for (let i = 0; i < 20; i ++) {
  if (i % 2 == 0) {
    sinMac.push(0);
    cosMac.push(pow(-1, i / 2) / fact(i));
    eMac.push(1 / fact(i));
  } else {
    sinMac.push(pow(-1, (i - 1) / 2) / fact(i));
    cosMac.push(0);
    eMac.push(1 / fact(i));
  }
}

//Creating the polynomials
let sin = createPolynomial(sinMac);
let cos = createPolynomial(cosMac);
let exp = createPolynomial(eMac);

//Making sure it works
console.log("Int sin: " + Integral(sin, 4)(0, pi));
console.log("Int cos: " + Integral(cos, 4)(0, pi));
console.log("Int exp: " + Integral(exp, 4)(0, 2));

console.log("Derv sin: " + Derivative(sin, 4)(pi));
console.log("Derv cos: " + Derivative(cos, 4)(pi));
console.log("Derv exp: " + Derivative(exp, 4)(1));
