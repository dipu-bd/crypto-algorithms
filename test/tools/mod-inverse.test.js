var it = require('mocha').it
var describe = require('mocha').describe

var modInverse = require('../../src/tools/mod-inverse')

describe('Modular Inverse (modinv)', () => {
  it('should not throw on invalid inputs', () => {
    modInverse('a', 0).should.be.NaN
    modInverse('s', 42).should.be.NaN
    modInverse('7', 'b').should.be.NaN
    modInverse('7', '4y').should.be.NaN
    modInverse(7, 'r').should.be.NaN
  })

  it('should work with positive inputs', () => {
    modInverse(3, 10).should.be.equal(7)
    modInverse(73, 10).should.be.equal(7)
    modInverse(7, 10).should.be.equal(3)
    modInverse(27, 10).should.be.equal(3)
  })

  it('should work with negative inputs', () => {
    modInverse(-3, 10).should.be.equal(3)
    modInverse(-63, 10).should.be.equal(3)
    modInverse(-7, 10).should.be.equal(7)
    modInverse(-27, 10).should.be.equal(7)
    modInverse(-9, 13).should.be.equal(10)
  })

  it('should not work if m < 2', () => {
    modInverse(3, 0).should.be.NaN
    modInverse(63, -1).should.be.NaN
    modInverse(7, 1).should.be.equal(0)
  })

  it('should be 0 if a % m == 0', () => {
    modInverse(5, 5).should.be.equal(0)
    modInverse(855, 5).should.be.equal(0)
    modInverse(-45, 5).should.be.equal(0)
  })

  it('should not work if gcd(a, m) != 1', () => {
    modInverse(8, 24).should.be.NaN
    modInverse(6, 12).should.be.NaN
    modInverse(8, 4).should.be.equal(0)
    modInverse(-8, 4).should.be.equal(0)
  })

  it('should pass this basic set', () => {
    modInverse(15, 1).should.be.equal(0)
    modInverse(0, 1).should.be.equal(0)
    modInverse(1, 1).should.equal(0)
    modInverse(-41, 1).should.equal(0)
    modInverse(-1, 1).should.equal(0)
    modInverse(1, 2).should.equal(1)
    modInverse(3, 6).should.be.NaN
    modInverse(7, 87).should.equal(25)
    modInverse(25, 87).should.equal(7)
    modInverse(-7, 87).should.equal(62)
    modInverse(-25, 87).should.equal(80)
    modInverse(2, 91).should.equal(46)
    modInverse(19, 1212393831).should.be.equal(701912218)
    modInverse(31, 73714876143).should.be.equal(45180085378)
    modInverse(3, 73714876143).should.be.NaN
    modInverse(45180085378, 73714876143).should.be.equal(31)
  })
})
