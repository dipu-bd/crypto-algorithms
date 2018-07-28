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
  [n, p, m] = [Number(n), Number(p), Number(m)]
  if (Number.isNaN(n) || Number.isNaN(p) || !m) {
    return NaN
  }
  if (!n) {
    return 0
  }
  if (!p || !(m - 1)) {
    return 1
  }
  if (p < 0) {
    let r = powerMod(n, -p, m)
    return modInverse(r, m)
  }
  let r = powerMod(n, p >> 1, m)
  r = (r * r) % m
  if (p & 1) r = (r * n) % m
  return r
}
