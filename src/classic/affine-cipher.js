'use strict';

var Tools = require('../tools');

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
  config = config || {};
  config.skip = (config.skip || []);
  config.ranges = (config.ranges || []);

  // build the config.ranges
  config.ranges.push(
    '\u0041-\u005A',  // A-Z
    '\u0061-\u007A'   // a-z
  );
  if (!config.skipDigits) {
    config.ranges.push('\u0030-\u0039');  // 0-9
  }
  if (config.all) {
    config.ranges = ['\u0000-\uFFFF'];
  }

  // build the config.skip
  if (config.stripWhitespace) {
    config.skip.push(/\s/g);
  }
  if (config.stripOthers) {
    config.skip.push(/[^\s\w\d]/g);
  }

  // validate keys
  if (!key || !key.a || !key.b) {
    throw new Error('Invalid key. Use {a, b} pair as a key.');
  }
  config.ranges = config.ranges.map(function (range) {
    const stop = (range || '').split('-');
    if (stop.length < 2) return {};
    let left = stop[0].charCodeAt(0);
    let right = stop[1].charCodeAt(0);
    const mod = right - left + 1;
    if (Tools.gcd(mod, key.a) !== 1) {
      throw new Error(`Invalid key.
      'key.a = ${key.a}' must be co-prime with the range: ${mod}.
      (Hint: choose a prime number)`);
    }
    if (config.decrypt) { // in decryption mode
      key.a = Tools.modinv(key.a, mod);
      key.b = -key.a * key.b;
    }
  });

  // strip characters using config.skip
  text = (text || '') + '';
  config.skip.forEach(function (regex) {
    text = text.replace(regex, '');
  })
  // build the cipher text
  let cipherText = '';
  text.split('').forEach(function (char) {
    let code = char.charCodeAt(0);
    
    for (let i = 0; i < config.ranges.length; ++i) {
      const { left, right, mod } = config.ranges[i];
      if (!mod) continue;
      if (code >= left && code <= right) {
        // apply range and break loop
        code -= left;
        code = (key.a * code + key.b) % mod;
        code = (code + mod) % mod;
        code += left;
        break;
      }
    }

    cipherText += String.fromCodePoint(code);
  })

  return cipherText;
}
