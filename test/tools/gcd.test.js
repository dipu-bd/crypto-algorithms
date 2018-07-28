var it = require('mocha').it
var describe = require('mocha').describe

var gcd = require('../../src/tools/gcd')

describe('Greatest Common Divisors (gcd)', () => {
  it('should not throw on invalid inputs', () => {
    gcd('a', 0).should.be.NaN
    gcd('s', 42).should.be.NaN
    gcd('7', 'b').should.be.NaN
    gcd('7', '4y').should.be.NaN
    gcd(7, 'r').should.be.NaN
  })

  it('should find gcd of two positive numbers', () => {
    gcd(4, 6).should.equal(2)
    gcd(6, 4).should.equal(2)
    gcd(1, 6).should.equal(1)
    gcd(3, 7).should.equal(1)
    gcd(56, 36).should.equal(4)
    gcd(6, 1).should.equal(1)
    gcd(886, 886).should.equal(886)
  })

  it('should find gcd of two negative numbers', () => {
    gcd(-4, -6).should.equal(2)
    gcd(-6, -4).should.equal(2)
    gcd(-1, -6).should.equal(1)
    gcd(-3, -7).should.equal(1)
    gcd(-56, -36).should.equal(4)
    gcd(-6, -1).should.equal(1)
    gcd(-886, -886).should.equal(886)
  })

  it('should accept 0 as one or both of the numbers', () => {
    gcd(0, 6).should.be.NaN
    gcd(6, 0).should.be.NaN
    gcd(0, 0).should.be.NaN
    gcd(-5, 0).should.be.NaN
    gcd(0, -5).should.be.NaN
  })

  it('should find gcd if one positive and one negative numbers', () => {
    gcd(-4, 6).should.equal(2)
    gcd(6, -4).should.equal(2)
    gcd(4, -6).should.equal(2)
    gcd(-6, 4).should.equal(2)
    gcd(-886, 886).should.equal(886)
  })

  it('should find gcd of multiple numbers', () => {
    gcd(4, -68, 6, 8, 122, 24, 32).should.be.equal(2)
    gcd(4, 68, 6, 8, -122, 24, 32).should.be.equal(2)
    gcd(21, 9, -12, 24, 33).should.be.equal(3)
    gcd().should.be.NaN
    gcd(10).should.be.NaN
    gcd(10, -10, 200, -200).should.be.equal(10)
  })

  it('should work with large numbers', () => {
    let n = -9223372036854775808
    let p = 9223372036854775807
    gcd(1, p).should.be.equal(1)
    gcd(-1, n).should.be.equal(1)
    gcd(p, 0).should.be.NaN
    gcd(n, 0).should.be.NaN
    gcd(p, p).should.be.equal(p)
    gcd(n, p).should.be.equal(p)
    gcd(p, n).should.be.equal(p)
    gcd(n, n).should.be.equal(p)
    gcd(9007199254740990, 900).should.be.equal(30)
    gcd(9007199254740990, 23302036834775800).should.be.equal(10)
    gcd(9223372036857580, -2331203683477800).should.be.equal(20)
  })
})
