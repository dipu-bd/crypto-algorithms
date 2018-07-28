'use strict'

/**
 * Finds the Greatest Common Divisors (GCD) of two values.
 * 
 * @param {Number} a - the first value
 * @param {Number} b - the second value
 * @return {Number} - the gcd of a and b, or NaN if numbers are invalid.
 * @module Tools.gcdOfPair
 */
exports.gcdOfPair = function (a, b) {
  // validate inputs
  [a, b] = [Number(a), Number(b)]
  if (Number.isNaN(a) || Number.isNaN(b) || !(a && b)) {
    return NaN // invalid inputs
  }
  // pre-process
  [a, b] = [Math.abs(a), Math.abs(b)]
  if (a === b) {
    return a
  }
  // find the gcd
  while(b !== 0) {
    [a, b] = [b, a % b]
  }
  return a
}

/**
 * Finds the Greatest Common Divisors (GCD) of multiple numbers.
 * 
 * @param {Number} nums - number to find gcd
 * @module Tools.gcd
 */
module.exports = function gcd(...nums) {
  if (!nums || nums.length < 2) {
    return NaN
  }
  let g = nums[0]
  for (let i = 1; i < nums.length; ++i) {
    g = exports.gcdOfPair(g, nums[i])
  }
  return g
}

