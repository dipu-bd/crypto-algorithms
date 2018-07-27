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

  it('should work with all character case with numbers', () => {
    affineCipher('abcDEF123ghIJ', {a: 1, b: 3}).should.be.equal('defGHI456jkLM')
    affineCipher('abcDEF123ghIJ', {a: 3, b: 3}).should.be.equal('dgjMPS692vyBE')
    affineCipher('abcDEF123ghIJ', {a: 5, b: 3}).should.be.equal('dinSXC123hmRW')
    affineCipher('abcDEF123ghIJ', {a: 11, b: 3}).should.be.equal('dozKVG456rcNY')

    affineCipher('defGHI456jkLM', {a: 1, b: 3}, { decrypt: true }).should.be.equal('abcDEF123ghIJ')
    affineCipher('dgjMPS692vyBE', {a: 3, b: 3}, { decrypt: true }).should.be.equal('abcDEF123ghIJ')
    affineCipher('dinSXC123hmRW', {a: 5, b: 3}, { decrypt: true }).should.be.equal('abcDEF123ghIJ')
    affineCipher('dozKVG456rcNY', {a: 11, b: 3}, { decrypt: true }).should.be.equal('abcDEF123ghIJ')
  })

  it('should work with negative keys params', () => {
    affineCipher('abz BZ 129', { a: -1, b: 3}).should.equal('dec EC 452')
    affineCipher('abz BZ 129', { a: -1, b: -3}).should.equal('dec EC 452')
    affineCipher('abz BZ 129', { a: -3, b: 3}).should.equal('dga GA 690')
    affineCipher('abz BZ 129', { a: -3, b: -3}).should.equal('dga GA 690')
    affineCipher('abz BZ 129', { a: -34532131, b: 322323}).should.equal('bye YE 452')
    affineCipher('abz BZ 129', { a: -34532131, b: -322323}).should.equal('bye YE 452')
  })

  it('should not strip whitespaces', () => {
    affineCipher('ab  cd   23', {a: 1, b: 3}).should.be.equal('de  fg   56')
  })

  it('should not strip other characters', () => {
    affineCipher('ab.bc 3.89 - &c', {a: 1, b: 3}).should.be.equal('de.ef 6.12 - &f')
  })

  it('can strip whitespaces', () => {
    affineCipher('a b', { a: 1, b: 3 }, { stripWhitespace: true }).should.be.equal('de')
    affineCipher('\n\r   ab\tabc ', { a: 1, b: 3 }, { stripWhitespace: true }).should.be.equal('dedef')
    affineCipher('   ab \n     abc', { a: 1, b: 3 }, { stripWhitespace: true }).should.be.equal('dedef')
    affineCipher('abc   ', { a: 1, b: 3 }, { stripWhitespace: true }).should.be.equal('def')
  })

  it('can strip other characters', () => {
    affineCipher('a b3.3*  *bc~!@#e$%^&d', { a: 1, b: 3 }, { stripOthers: true }).should.be.equal('d e66  efhg')
  })

  it('can strip other characters with whitespaces', () => {
    affineCipher('a b3.3*  *bc~!@#e$%^&d', { a: 1, b: 3 }, { stripOthers: true, stripWhitespace: true}).should.be.equal('de66efhg')
  })

  it('can leave digits untouched', () => {
    affineCipher('abc = 12.34', { a: 1, b: 3 }, { skipDigits: true }).should.be.equal('def = 12.34')
  })

  it('accept and overwrites the range settings', () => {
    affineCipher('জাসদ ০৯', { a: 1, b: 3 }, {
      ranges: [
        '\u0985-\u09B9',
        '\u09E6-\u09EF'
      ]
    }).should.be.equal('টাআ঩ ৩২')
  })

  it('accept and overwrites the skip settings', () => {
    affineCipher('ask0239 kjhd /a', { a: 1, b: 3 }, {
      skip: [/[0-9]/g]
    }).should.be.equal('dvn nmkg /d')
  })

  it('can strip other characters with whitespaces skipping digits', () => {
    affineCipher('a b3.3*  *bc~!@#e$%^&d', { a: 1, b: 3 }, {
      stripOthers: true,
      stripWhitespace: true,
      skip: [/[0-9]/g]
    }).should.be.equal('deefhg')
  })

  it('can shift characters of entire unicode range', () => {
    affineCipher(' o3, lOP জাসদ এ ০৯ 学中文 \u3583\u0298 .: ', { a: 1, b: 3 }, {
      all: true
    }).should.be.equal('#r6/#oRS#টু঻঩#঒#৩৲#孩丰斊#㖆ʛ#1=#')
  })

  it('should let .ranges hold all the power', () => {
    affineCipher(' o3, lOP জাসদ এ ০৯ 学中文 \u3583\u0298 .: ', { a: 1, b: 3 }, {
      ranges: ['\u0000-\uFFFF']
    }).should.be.equal('#r6/#oRS#টু঻঩#঒#৩৲#孩丰斊#㖆ʛ#1=#')
  })

  it('should let skip hold all the power', () => {
    affineCipher(' o3, lOP জাসদ এ ০৯ 学中文 \u3583\u0298 .: ', { a: 1, b: 3 }, {
      skip: [/[ \u0100-\uFFFF]/g]
    }).should.be.equal('r6,oRS.:')
  })

  it('can decrypt whatever it has encrypted', () => {
    var text = ' o3, lOP জাসদ এ ০৯ 学中文 \u3583\u0298 .: '
    var cipher = affineCipher(text, { a: 431, b: 2393 }, { ranges: ['\u0000-\uFFFF'] })
    var reverse = affineCipher(cipher, { a: 431, b: 2393 }, { ranges: ['\u0000-\uFFFF'], decrypt: true })
    reverse.should.be.equal(text)
  })
})
