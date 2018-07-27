'use strict';

/**
 * Finds the Greatest Common Divisors (GCD) of two values.
 * 
 * @param {Number} a - the first value
 * @param {Number} b - the second value
 * @return {Number} - the gcd of a and b, or NaN if numbers are invalid.
 * @module Tools.gcd
 */
module.exports = function gcd(a, b) {
  // validate inputs
  [a, b] = [Math.abs(Number(a)), Math.abs(Number(b))];
  if (a === NaN || b === NaN || !(a && b)) {
    return NaN; // invalid inputs
  }
  // pre-process
  if (a == b) {
    return a;
  } else if (a < b) {
    [a, b] = [b, a];
  }
  // find the gcd
  while(b) {
    [a, b] = [b, a % b];
  }
  return a;
}
