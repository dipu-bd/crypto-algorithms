'use strict'

/**
 * Finds the modular multiplicative inverse of a number.
 * 
 * @param {Number} a - the number
 * @param {Number} m - the modulus
 * @return {Number} - the modular inverse of <code>a</code>, with respect to modulus
 * <code>m</code>, or <code>NaN</code> if inputs are invalid.
 * @module Tools.modInverse
 */
module.exports = function modInverse(a, m) {
  // validate inputs
  [a, m] = [Number(a), Number(m)]
  if (Number.isNaN(a) || Number.isNaN(m) || m < 1) {
    return NaN // invalid inputs
  }
  a = (a % m + m) % m
  if (!a || m === 1) {
    return 0 // inverse is zero
  }
  // find the gcd
  const s = []
  let b = m
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
  return (y % m + m) % m
}
