'use strict'

// Classic cryptography
exports.ShiftCipher = require('./classic/shift-cipher')
exports.CaesarCipher = exports.ShiftCipher // alias
exports.AffineCipher = require('./classic/affine-cipher')
exports.SubstitutionCipher = require('./classic/substitution-cipher')

// Others
exports.Tools = require('./tools')
