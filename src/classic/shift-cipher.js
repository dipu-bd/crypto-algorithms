'use strict'

/**
 * Apply shift cipher to the given text.
 * <pre>
 * // default configs
 * {
 *   shift: 3,                  // the shift position for each letter
 *   all: false,                // shift all characters regardless their type
 *   skipDigits: false,         // do not shift the digits
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

module.exports = shiftCipher;
