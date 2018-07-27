var expect = require('chai').expect;
var shiftCipher = require('../../src/classic/shift-cipher');

describe('Shift Cipher / Caesar cipher', () => {
  it('should work with no parameters', () => {
    shiftCipher.should.not.throw();
    shiftCipher().should.equal('');
  });

  it('should work with empty string', () => {
    shiftCipher('').should.equal('');
  });

  it('should work with no config', () => {
    shiftCipher('dipu').should.be.equal('glsx');
  })

  it('should work with empty config', () => {
    shiftCipher('dipu', {}).should.be.equal('glsx');
  });

  it('should accept shift = 0', () => {
    shiftCipher('abcd', {
      shift: 0
    }).should.be.equal('abcd');
  });

  it('should accept positive shift config', () => {
    shiftCipher('abcd', {
      shift: 345
    }).should.be.equal('hijk');
  });

  it('should accept negative shift config', () => {
    shiftCipher('defg', {
      shift: -3
    }).should.be.equal('abcd');
  });

  it('should accept and cipher numbers', () => {
    shiftCipher('abc123').should.be.equal('def456');
  })

  it('should work with all character cases', () => {
    shiftCipher('abc123').should.be.equal('def456');
  })

  it('should work with all character case with numbers', () => {
    shiftCipher('abcDEF123ghIJ').should.be.equal('defGHI456jkLM');
  })

  it('should use character set as a ring', () => {
    shiftCipher('xyzXYZ789').should.be.equal('abcABC012');
  });

  it('should not strip whitespaces', () => {
    shiftCipher('ab  cd   23').should.be.equal('de  fg   56');
  });

  it('should not strip other characters', () => {
    shiftCipher('ab.bc 3.89 - &c').should.be.equal('de.ef 6.12 - &f');
  });

  it('can strip whitespaces', () => {
    shiftCipher('a b', {
      stripWhitespace: true
    }).should.be.equal('de');

    shiftCipher('\n\r   ab\tabc ', {
      stripWhitespace: true
    }).should.be.equal('dedef');

    shiftCipher('   ab \n     abc', {
      stripWhitespace: true
    }).should.be.equal('dedef');

    shiftCipher('abc   ', {
      stripWhitespace: true
    }).should.be.equal('def');
  });

  it('can strip other characters', () => {
    shiftCipher('a b3.3*  *bc~!@#e$%^&d', {
      stripOthers: true
    }).should.be.equal('d e66  efhg');
  });

  it('can strip other characters with whitespaces', () => {
    shiftCipher('a b3.3*  *bc~!@#e$%^&d', {
      stripOthers: true,
      stripWhitespace: true
    }).should.be.equal('de66efhg');
  });

  it('can leave digits untouched', () => {
    shiftCipher('abc = 12.34', {
      skipDigits: true
    }).should.be.equal('def = 12.34');
  });

  it('accept and overwrites the range settings', () => {
    shiftCipher('জাসদ ০৯', {
      ranges: [
        '\u0985-\u09B9',
        '\u09E6-\09EF'
      ]
    }).should.be.equal('টাআ঩ ০৯');
  });

  it('accept and overwrites the skip settings', () => {
    shiftCipher('ask0239 kjhd /a', {
      skip: [/[0-9]/g]
    }).should.be.equal('dvn nmkg /d');
  });

  it('can strip other characters with whitespaces skipping digits', () => {
    shiftCipher('a b3.3*  *bc~!@#e$%^&d', {
      stripOthers: true,
      stripWhitespace: true,
      skip: [/[0-9]/g]
    }).should.be.equal('deefhg');
  });

  it('can shift characters of entire unicode range', () => {
    shiftCipher(' o3, lOP জাসদ এ ০৯ 学中文 \u3583\u0298 .: ', {
      all: true
    }).should.be.equal('#r6/#oRS#টু঻঩#঒#৩৲#孩丰斊#㖆ʛ#1=#');
  });

  it('should let .ranges hold all the power', () => {
    shiftCipher(' o3, lOP জাসদ এ ০৯ 学中文 \u3583\u0298 .: ', {
      ranges: ['\u0000-\uFFFF']
    }).should.be.equal('#r6/#oRS#টু঻঩#঒#৩৲#孩丰斊#㖆ʛ#1=#');
  });

  it('should let skip hold all the power', () => {
    shiftCipher(' o3, lOP জাসদ এ ০৯ 学中文 \u3583\u0298 .: ', {
      skip: [/[ \u0100-\uFFFF]/g]
    }).should.be.equal('r6,oRS.:');
  });

  it('can decrypt whatever it has encrypted', () => {
    var text = ' o3, lOP জাসদ এ ০৯ 学中文 \u3583\u0298 .: ';
    var cipher = shiftCipher(text, { shift: 10 })
    var reverse = shiftCipher(cipher, { shift: -10 })
    reverse.should.be.equal(text);
  });

  // it('should ', () => {
  //   shiftCipher('').should.be.equal('')
  // })
});