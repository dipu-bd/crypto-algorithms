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
 * Apply substitution cipher to the text given the substitution table.
 * 
 * @param {String} text - the plain text.
 * @param {Object} table - the substitution table [a collection of {regex: replacer} pair].
 * @module SubstitutionCipher
 */
module.exports = function substitutionCipher(text, table) {
  // init default config
  table = table || {}
  Object.keys(table).forEach(regex => {
    text = text.replace(regex, table[regex])
  })
  return text
}
