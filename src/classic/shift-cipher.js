'use strict'

/**
 * Apply shift cipher to the given text.
 * <pre>
 * // default configs
 * {
 *   shift: 3,                  // the shift position for each letter
 *   skipNumbers: false,        // do not shift numbers
 *   stripOthers: false,        // strip all letters except alphabets, numbers and whitespaces.
 *   stripWhitespace: false,    // strip whitespaces between words
 *   ranges: [],                // add ranges to shift
 *   skip: [],                  // regex to exclude from output
 * }
 * </pre>
 * @param {String} text - the plain text to use
 * @param {Object} config - customize the cipher
 */
function shiftCipher(text, config) {
  config = config || {};
  if (config.shift instanceof Number) {
    config.shift = Math.floor(config.shift);
  } else {
    config.shift = 3;
  }

  config.skip = (config.skip || []);
  if (config.stripWhitespace) {
    config.skip.push(/\s/g);
  }
  if (config.stripOthers) {
    config.skip.push(/^(\s|\w|\d)/g);
  }

  config.ranges = (config.ranges || []).push(
    '\u0041-\u005A',  // A-Z
    '\u0061-\u007A'   // a-z
  );
  if (!config.skipNumbers) {
    config.ranges.push('\u0030-\u0039');  // 0-9
  }

  config.skip.forEach(function (regex) {
    text = text.replace(regex, '');
  })

  var cipherText = '';
  text.forEach(function (char) {
    var code = char.charCodeAt(0);
    for (var i = 0; i < config.ranges.length; ++i) {
      var range = config.ranges[i];
      if (!(range instanceof String)) continue;
      var stop = range.split('-');
      if (stop.length < 2) continue;
      var left = stop[0].charCodeAt(0);
      var right = stop[1].charCodeAt(0);
      if (code >= left && code <= right) {
        var mod = right - left + 1;
        code = (code - left + shift) % mod;
        code = (code + mod) % mod + left;
        break;
      }
    }
    cipherText += String.fromCodePoint(code);
  })

  return cipherText
}

module.exports = shiftCipher
