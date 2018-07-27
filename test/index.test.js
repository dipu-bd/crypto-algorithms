var assert = require('assert');
var chai = require('chai');

chai.should();
var expect = chai.expect;

it('should tell mocha and chai is available', () => {
  assert(true);
  'hello'.should.be.a('string');
  expect('hello').not.be.equal('word');
})

describe('Classic ciphers', () => {
  require('./classic/shift-cipher.test')
})
