'use strict'

var modInverse = require('./mod-inverse')

/**
 * Calculates the <code>n<sup>p</sup> mod m</code> efficiently.
 * 
 * @param {Number} n - the number
 * @param {Number} p - the exponent
 * @param {Number} m - the modulus
 * @module Tools.powerMod
 */
module.exports = function powerMod(n, p, m) {
  // validate
  [n, p, m] = [Number(n), Number(p), Number(m)]
  if (Number.isNaN(n) || Number.isNaN(p) || Number.isNaN(m) || m < 1) {
    return NaN
  }
  // corner cases
  if (n === 0) {
    return 0
  }
  if (p === 0 || m === 1) {
    return 1
  }
  if (p < 0) {
    p = -p
    n = modInverse(n, m)
  }
  // calculate bigmod
  let res = 1
  let x = n % m
  while (p)
  {
    if (p % 2 === 1) {
      res = (res * x) % m
    }
    x = (x * x) % m
    p = Math.floor(p / 2)
  }
  return res
}
