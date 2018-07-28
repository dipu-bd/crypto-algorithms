var it = require('mocha').it
var describe = require('mocha').describe

var powerMod = require('../../src/tools/power-mod')

describe('Power and modulus', () => {
  it('should not throw on invalid numbers', () => {
    powerMod('a', 0, 4).should.be.NaN
    powerMod('s', 42, -2).should.be.NaN
    powerMod('7', 'b', '4').should.be.NaN
    powerMod('7', '4', '2f').should.be.NaN
    powerMod(7, 'r', '2').should.be.NaN
  })

  it('should work with positive inputs', () => {
    powerMod(3, 2, 13).should.be.equal(9)
  })

  it('should work with negative inputs', () => {
    powerMod(-3, 2, 13).should.be.equal(9)
    powerMod(3, -2, 13).should.be.equal(3)
    powerMod(-3, -2, 13).should.be.equal(3)
  })

  it('should handle invalid inputs', () => {
    powerMod(-3, 2, -13).should.be.NaN
    powerMod(3, 2, -13).should.be.NaN
    powerMod(3, -2, -13).should.be.NaN
    powerMod(-3, -2, -13).should.be.NaN
    powerMod(2, -4, 4).should.be.NaN
    powerMod(4, -1, 8).should.be.NaN
  })

  it('should pass this basic set', () => {
    powerMod(0, 0, 1).should.be.equal(0)
    powerMod(1, 0, 1).should.be.equal(1)
    powerMod(1, 1, 1).should.be.equal(1)
    powerMod(0, 0, 13).should.be.equal(0)
    powerMod(1, 0, 13).should.be.equal(1)
    powerMod(7, 0, 13).should.be.equal(1)
    powerMod(7, 2, 13).should.be.equal(10)
    powerMod(3, 10, 13).should.be.equal(3)
    powerMod(7, 100, 13).should.be.equal(9)
    powerMod(11, 1, 13).should.be.equal(11)
    powerMod(7, 17, 13).should.be.equal(11)
    powerMod(3, 18132, 17).should.be.equal(13)
    powerMod(17, 1765, 3).should.be.equal(2)
    powerMod(2374859, 3029382, 36123).should.be.equal(13195)
  })

  it('can handle big numbers', () => {
    let x = 9007199254740990
    let y = 9707199254740990
    powerMod(x, 0, 10).should.be.equal(1)
    powerMod(x, 10, 10).should.be.equal(0)
    powerMod(x, y, 10).should.be.equal(0)
    powerMod(x, y, 100).should.be.equal(0)
    powerMod(x, y, 112300).should.be.equal(54200)
    powerMod(x, y, 21474835).should.be.equal(15010455)
  })
})
