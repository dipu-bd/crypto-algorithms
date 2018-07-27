'use strict'

/**
 * Shift cipher, also known as Caesar cipher, is one of the simplest and most
 * widely known encryption technique. The Caesar cipher is named Julius Caesar,
 * who used it with a shift of three to protect his military messages.
 * 
 * As with all single-alphabet substitution ciphers, the Caesar cipher is easily
 * broken and in modern practice is of no use in direct communication. But it
 * still has modern application in the ROT13 system, as well as a part of more
 * complex schemes like- Vigenere ciphers.
 * 
 * This module provides a method to apply Shift cipher to a given text. The
 * system is easily customizable through a set of configuration paramenters.
 * The default configurations used by the method is given here:
 * <pre lang="js">{
 *   shift: 3,                  // the positions to shift
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
 *   var originalText = 'any text';
 *   var cipherText = shiftCipher(, { shift: 5 });
 * </pre>
 * You can decipher easily by passing a negative shift value:
 * <pre>
 *   var decipheredText = shiftCipher(ciphrText, { shift: -5 });
 * </pre>
 * 
 * @param {String} text - the plain text
 * @param {Object} config - to customize the system
 * @module ShiftCipher
 */
module.exports = function shiftCipher(text, config) {
  // init default config
  config = config || {};
  config.skip = (config.skip || []);
  config.ranges = (config.ranges || []);
  if (typeof config.shift === 'number') {
    config.shift = Math.floor(config.shift);
  } else {
    config.shift = 3;
  }

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

  // function that handles the code shifting
  const shifter = function(code) {
    return code;
  }

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
      // get the defined range
      const range = config.ranges[i] || '';
      const stop = range.split('-');
      if (stop.length < 2) continue;
      let left = stop[0].charCodeAt(0);
      let right = stop[1].charCodeAt(0);
      // apply range and break loop
      if (code >= left && code <= right) {
        const mod = right - left + 1;
        code = (code - left + config.shift) % mod;
        code = (code + mod) % mod + left;
        break;
      }
    }

    cipherText += String.fromCodePoint(code);
  })

  return cipherText;
}
