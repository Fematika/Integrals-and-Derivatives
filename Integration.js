const e = 2.718281846; //Euler's constant
const pi = 3.141592654;

function pow(base, exponent) {
  let product = 1;
  
  for (let i = 0; i < exponent; i ++) {
    product *= base;
  }
  
  return product;
}

function factorial(n) {
  let product = 1;
  
  for (let i = 1; i <= n; i ++) {
    product *= i
  }
  
  return product;
}

//Standard approximation of the derivative (f(x + h) - f(x)) / h
function derivative(f) {
  return function(x) {
    (f(x + 0.00001) - f(x)) / 0.00001;
  };
}

//Riemann sum approximation of integral
function integral(f) {
  return function(a, b) {
    const deltaX = (b - a) / 100000;
    let sum = 0;
    
    for (let i = 0; i <= (b - a) / deltaX; i ++) {
      sum += f(a + i * deltaX) * deltaX;
    }
    
    return sum;
  };
}

//Function to make polynomials and Maclaurin expansions
function createPolynomial(coefficients) {
  return function(x) {
    let sum = 0;
    
    for (let i = 0; i < coefficients.length; i ++) {
      sum += coefficients[i] * pow(x, i);
    }
    
    return sum;
  };
}

let sinMac = []; //Maclaurin expansion coefficents for sin
let cosMac = []; //Maclaurin expansion coefficients for cos
let eMac = []; //Maclaurin expansion coefficients for e^x

//Creating the coefficients
for (let i = 0; i < 25; i ++) {
  if (i % 2 == 0) {
    sinMac.push(0);
    cosMac.push(pow(-1, i / 2) / factorial(i));
  } else {
    sinMac.push(pow(-1, (i - 1) / 2) / factorial(i));
    cosMac.push(0);
  }
  
  eMac.push(1 / factorial(i));
}

//Creating the polynomials
let sin = createPolynomial(sinMac);
let cos = createPolynomial(cosMac);
let exp = createPolynomial(eMac);

//Making sure it works
console.log("Integral of sin: " + integral(sin)(0, pi));
console.log("Integral of cos: " + integral(cos)(0, pi));
console.log("Integral of exp: " + integral(exp)(0, 2));

console.log("Derivative of sin: " + derivative(sin)(pi));
console.log("Derivative of cos: " + derivative(cos)(pi));
console.log("Derivative of exp: " + derivative(exp)(1));

//Finding non-elementary integral approximation
function powtow(x) {
  return pow(x, x);
}

console.log(integral(powtow)(0, 1));
console.log(derivative(powotw)(1));
