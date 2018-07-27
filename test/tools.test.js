var Tools = require('../src/tools');

describe('Tools', () => {

  describe('Greatest Common Divisors (gcd)', () => {
    it('should not throw on invalid inputs', () => {
      Tools.gcd('a', 0).should.be.NaN
      Tools.gcd('s', 42).should.be.NaN
      Tools.gcd('7', 'b').should.be.NaN
      Tools.gcd('7', '4y').should.be.NaN
      Tools.gcd(7, 'r').should.be.NaN
    })

    it('should find gcd of two positive numbers', () => {
      Tools.gcd(4, 6).should.equal(2)
      Tools.gcd(6, 4).should.equal(2)
      Tools.gcd(1, 6).should.equal(1)
      Tools.gcd(3, 7).should.equal(1)
      Tools.gcd(56, 36).should.equal(4)
      Tools.gcd(6, 1).should.equal(1)
      Tools.gcd(886, 886).should.equal(886)
    })

    it('should find gcd of two negative numbers', () => {
      Tools.gcd(-4, -6).should.equal(2)
      Tools.gcd(-6, -4).should.equal(2)
      Tools.gcd(-1, -6).should.equal(1)
      Tools.gcd(-3, -7).should.equal(1)
      Tools.gcd(-56, -36).should.equal(4)
      Tools.gcd(-6, -1).should.equal(1)
      Tools.gcd(-886, -886).should.equal(886)
    })

    it('should accept 0 as one or both of the numbers', () => {
      Tools.gcd(0, 6).should.be.NaN
      Tools.gcd(6, 0).should.be.NaN
      Tools.gcd(0, 0).should.be.NaN
      Tools.gcd(-5, 0).should.be.NaN
      Tools.gcd(0, -5).should.be.NaN
    })

    it('should find gcd if one positive and one negative numbers', () => {
      Tools.gcd(-4, 6).should.equal(2)
      Tools.gcd(6, -4).should.equal(2)
      Tools.gcd(4, -6).should.equal(2)
      Tools.gcd(-6, 4).should.equal(2)
      Tools.gcd(-886, 886).should.equal(886)
    })
  })

  describe('Modular Inverse (modinv)', () => {
    it('should not throw on invalid inputs', () => {
      Tools.modInverse('a', 0).should.be.NaN
      Tools.modInverse('s', 42).should.be.NaN
      Tools.modInverse('7', 'b').should.be.NaN
      Tools.modInverse('7', '4y').should.be.NaN
      Tools.modInverse(7, 'r').should.be.NaN
    })

    it('should work with positive inputs', () => {
      Tools.modInverse(3, 10).should.be.equal(7)
      Tools.modInverse(73, 10).should.be.equal(7)
      Tools.modInverse(7, 10).should.be.equal(3)
      Tools.modInverse(27, 10).should.be.equal(3)
    })

    it('should work with negative inputs', () => {
      Tools.modInverse(-3, 10).should.be.equal(3)
      Tools.modInverse(-63, 10).should.be.equal(3)
      Tools.modInverse(-7, 10).should.be.equal(7)
      Tools.modInverse(-27, 10).should.be.equal(7)
    })

    it('should not work if m < 2', () => {
      Tools.modInverse(3, 0).should.be.NaN
      Tools.modInverse(63, -1).should.be.NaN
      Tools.modInverse(7, 1).should.be.NaN
    })

    it('should not work if a % m == 0', () => {
      Tools.modInverse(5, 5).should.be.NaN
      Tools.modInverse(855, 5).should.be.NaN
      Tools.modInverse(-45, 5).should.be.NaN
    })

    it('should not work if gcd(a, m) != 1', () => {
      Tools.modInverse(8, 24).should.be.NaN
      Tools.modInverse(6, 12).should.be.NaN
      Tools.modInverse(8, 4).should.be.NaN
      Tools.modInverse(-8, 4).should.be.NaN
    })
  })

})
