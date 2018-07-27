var it = require('mocha').it
var describe = require('mocha').describe

var assert = require('assert')
var chai = require('chai')

chai.should()
var expect = chai.expect

describe('General', () => {
  it('should tell mocha and chai is available', () => {
    assert(true)
    'hello'.should.be.a('string')
    expect('hello').not.be.equal('word')
  })
})

describe('Tools', () => {
  require('./tools/gcd.test')
  require('./tools/mod-inverse.test')
})

describe('Classic ciphers', () => {
  require('./classic/shift-cipher.test')
  require('./classic/affine-cipher.test')
})
