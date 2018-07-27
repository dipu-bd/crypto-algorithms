'use strict'

var Tools = require('../tools')

/**
 * Applies affine cipher
 * <pre lang="js">{
 *   decrypt: false,            // set it to true to perform a decryption
 *   all: false,                // shift all characters regardless their type
 *   skipDigits: false,         // do not shift the digits
 *   stripOthers: false,        // strip all letters except alphabets, numbers and whitespaces.
 *   stripWhitespace: false,    // strip whitespaces between words
 *   ranges: [],                // add ranges to shift
 *   skip: [],                  // regex to exclude from output
 * }</pre>
 * 
 * <h4>Examples</h4>
 * To simply get a cipher text:
 * <pre>
 *   var plainText = 'any text';
 *   var cipherText = affineCipher(plainText, { a: 3, b: 7 });
 * </pre>
 * You can decipher easily by passing a negative shift value:
 * <pre>
 *   var decipheredText = affineCipher(cipherText, { a: 3, b: 7 }, { decrypt: true });
 * </pre>
 * 
 * @param {String} text - the plain text
 * @param {Object} key - the key pair: <code>{a, b}</code> (<code>a</code> must co-prime with all ranges)
 * @param {Object} config - to customize the system
 * @module AffineCipher
 */
module.exports = function affineCipher(text, key, config) {
  // init default config
  config = config || {}
  config.skip = (config.skip || [])
  config.ranges = (config.ranges || [])

  // build the config.ranges
  config.ranges.push(
    '\u0041-\u005A',  // A-Z
    '\u0061-\u007A'   // a-z
  )
  if (!config.skipDigits) {
    config.ranges.push('\u0030-\u0039')  // 0-9
  }
  if (config.all) {
    config.ranges = ['\u0000-\uFFFF']
  }

  // build the config.skip
  if (config.stripWhitespace) {
    config.skip.push(/\s/g)
  }
  if (config.stripOthers) {
    config.skip.push(/[^\s\w\d]/g)
  }

  // validate keys
  key = key || { a: 0, b: 0 }
  key.a = Math.abs(Number(key.a)) || 1
  key.b = Math.abs(Number(key.b)) || 0

  // pre-process and validate ranges
  let ranges = []
  config.ranges.forEach(function (range) {
    let {a, b} = key
    const stop = (range || '').split('-')
    if (stop.length < 2) return // invalid format
    let left = stop[0].charCodeAt(0)
    let right = stop[1].charCodeAt(0)
    const mod = right - left + 1
    if (Tools.gcd(mod, a) !== 1) return // not a valid range
    if (config.decrypt) { // in decryption mode
      a = Tools.modInverse(a, mod)
      b = -(a * b) % mod
    }
    ranges.push({left, right, mod, a, b})
  })

  // strip characters using config.skip
  text = (text || '') + ''
  config.skip.forEach(function (regex) {
    text = text.replace(regex, '')
  })
  // build the cipher text
  let cipherText = ''
  text.split('').forEach(function (char) {
    let code = char.charCodeAt(0)
    
    for (let i = 0; i < ranges.length; ++i) {
      const { left, right, mod, a, b } = ranges[i]
      if (!mod) continue
      if (code >= left && code <= right) {
        // apply range and break loop
        code -= left
        code = (a * code + b) % mod
        code = (code + mod) % mod
        code += left
        break
      }
    }

    cipherText += String.fromCodePoint(code)
  })

  return cipherText
}
