'use strict'

/**
 * Finds the modular multiplicative inverse of a number.
 * 
 * @param {Number} n - the number
 * @param {Number} m - the modulus
 * @return {Number} - the modular inverse of <code>a</code>, with respect to modulus
 * <code>m</code>, or <code>NaN</code> if inputs are invalid.
 * @module Tools.modInverse
 */
module.exports = function modInverse(n, m) {
  // validate inputs
  [n, m] = [Number(n), Number(m)]
  if (Number.isNaN(n) || Number.isNaN(m)) {
    return NaN // invalid inputs
  }
  n = n % m
  if (!n || m < 2) {
    return NaN // inverse does not exists
  }
  // find the gcd
  let a = Math.abs(n)
  let b = m
  const s = []
  while(b) {
    [a, b] = [b, a % b]
    s.push({a, b})
  }
  if (a !== 1) {
    return NaN
  }
  // find the inverse
  let x = 1
  let y = 0
  for(let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y,  x - y * Math.floor(s[i].a / s[i].b)]
  }
  y = (y % m + m) % m
  return n < 1 ? -y : y
}
