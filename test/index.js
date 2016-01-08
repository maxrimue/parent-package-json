var assert = require('assert'),
  parent = require('../lib/index.js'),
  mock = require('mock-fs'),
  fs = require('fs'),
  expect = require('chai').expect;

var mockFs = {
  'test': {
    'package.json': '{"version":"1.0.0"}',
    'second_folder': {
      'package.json': '{"version":"2.0.0"}'
    },
    'third_folder': {
      'fourth_folder': {
        'fifth_folder': {
          'package.json': '{"version":"3.0.0"}'
        }
      }
    }
  }
};

mock(mockFs);

describe('Finding files', function() {
  it('should find a package.json in the parent directory', function() {
    expect(parent('test/second_folder').path).to.equal('test/package.json');
  });
  it('should find the parent package.json and ignore its own', function() {
    expect(parent('test/second_folder').path).to.equal('test/package.json');
  });
  it('should continue until a package.json is found', function() {
    expect(parent('test/third_folder/fourth_folder/fifth_folder').path).to.equal('test/package.json');
  });
  it('should equal to false if no package.json can be found', function() {
    expect(parent('test')).to.equal(false);
  });
  it('should find its own package.json', function() {
    mock.restore();
    expect(parent()).to.not.equal(false);
    mock(mockFs);
  });
});

describe('Reading content', function() {
  it('should be able to read a package.json', function() {
    expect(parent('test/second_folder').path).to.equal('test/package.json');
    expect(parent('test/second_folder').read()).to.equal('{"version":"1.0.0"}');
  });
});

describe('Parsing content', function() {
  it('should be able to read and parse a package.json', function() {
    expect(parent('test/second_folder').path).to.equal('test/package.json');
    expect(parent('test/second_folder').parse()).to.eql({'version': '1.0.0'});
    expect(parent('test/second_folder').parse().version).to.equal('1.0.0');
  });
});

after(function() {
  mock.restore();
});
