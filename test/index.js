var assert = require('assert'),
  parent = require('../lib/index.js'),
  mock = require('mock-fs'),
  fs = require('fs'),
  path = require('path'),
  expect = require('chai').expect;

var mockFs = {
  'test': {
    'first_folder': {
      'package.json': '{"version":"2.0.0"}',
      'second_folder': {
        'third_folder': {
          'package.json': '{"version":"1.0.0"}',
          'fourth_folder': {
            'package.json': '{"version":"3.0.0"}',
            'fifth_folder': {
              'package.json': '{"version":"4.0.0"}'
            }
          }
        }
      }
    }
  }
};

mock(mockFs);

describe('Finding files', function() {
  it('should find a package.json in the parent directory', function() {
    expect(parent('test/first_folder/second_folderthird_folder').path).to.equal(path.normalize('test/first_folder/package.json'));
  });
  it('should find the parent package.json and ignore its own', function() {
    expect(parent('test/first_folder/second_folder/third_folder/fourth_folder').path).to.equal(path.normalize('test/first_folder/second_folder/third_folder/package.json'));
  });
  it('should continue until a package.json is found', function() {
    expect(parent('test/first_folder/second_folder/third_folder').path).to.equal(path.normalize('test/first_folder/package.json'));
  });
  it('should equal to false if no package.json can be found', function() {
    expect(parent('test/first_folder')).to.equal(false);
  });
  it('should ignore one package.json if an ignore parameter is passed', function() {
    expect(parent('test/first_folder/second_folder/third_folder/fourth_folder', 1).path).to.equal('test/first_folder/package.json');
  });
  it('should ignore two package.jsons if an ignore parameter is passed', function() {
    expect(parent('test/first_folder/second_folder/third_folder/fourth_folder/fifth_folder', 2).path).to.equal('test/first_folder/package.json');
  });
});

describe('Reading content', function() {
  it('should be able to read a package.json', function() {
    expect(parent('test/first_folder/second_folder/third_folder').path).to.equal(path.normalize('test/first_folder/package.json'));
    expect(parent('test/first_folder/second_folder/third_folder').read()).to.equal('{"version":"2.0.0"}');
  });
});

describe('Parsing content', function() {
  it('should be able to read and parse a package.json', function() {
    expect(parent('test/first_folder/second_folder/third_folder').path).to.equal(path.normalize('test/first_folder/package.json'));
    expect(parent('test/first_folder/second_folder/third_folder').parse()).to.eql({'version': '2.0.0'});
    expect(parent('test/first_folder/second_folder/third_folder').parse().version).to.equal('2.0.0');
  });
});

after(function() {
  mock.restore();
});
