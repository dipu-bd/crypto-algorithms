'use strict'

// Classic cryptography
exports.ShiftCipher = require('./classic/shift-cipher')
exports.CaesarCipher = exports.ShiftCipher

exports.AffineCipher = require('./classic/affine-cipher')

// Others
exports.Tools = require('./tools')
