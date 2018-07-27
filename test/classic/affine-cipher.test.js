var it = require('mocha').it
var describe = require('mocha').describe

var affineCipher = require('../../src/classic/affine-cipher')

describe('Shift Cipher / Caesar cipher', () => {
  it('should work with parameters', () => {
    affineCipher().should.be.equal('')
    affineCipher('', {}).should.be.equal('')
    affineCipher('', {}, {}).should.be.equal('')
    affineCipher('abz129').should.be.equal('abz129')
    affineCipher('abz129', {}).should.be.equal('abz129')
    affineCipher('abz129', {}, {}).should.be.equal('abz129')
    affineCipher('abz129', {a: 11, b: -3}).should.be.equal('dos452')
    affineCipher('abz129', {a: 11, b: -3}, {}).should.be.equal('dos452')
  })

  it('should work with invalid key', () => {
    affineCipher('abz129', {a: 13, b: 23}).should.be.equal('abz690')
    affineCipher('abz129', {a: 5, b: 23}).should.be.equal('xcs129')
    affineCipher('abz129', {a: 1, b: 3}).should.be.equal('dec452')
    affineCipher('abz129', {a: -1, b: 3}).should.be.equal('dec452')
    affineCipher('abz129', {a: 5, b: 0}).should.be.equal('afv129')
  })

  it('should work with proper key', () => {
    affineCipher('abz129', {a: 1, b: 3}).should.be.equal('dec452')
  })

  it('should be able to decrypt', () => {
    affineCipher('abz129', {}, { decrypt: true }).should.be.equal('abz129')
    affineCipher('afv129', {a: 5, b: 0}, { decrypt: true }).should.be.equal('abz129')
    affineCipher('dec452', {a: 1, b: 3}, { decrypt: true }).should.be.equal('abz129')
    affineCipher('dec452', {a: -1, b: 3}, { decrypt: true }).should.be.equal('abz129')
    affineCipher('xcs129', {a: 5, b: 23}, { decrypt: true }).should.be.equal('abz129')
    affineCipher('abz690', {a: 13, b: 23}, { decrypt: true }).should.be.equal('abz129')
    affineCipher('dos452', {a: 11, b: -3}, { decrypt: true }).should.be.equal('abz129')
  })
})
