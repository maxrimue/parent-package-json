var fs = require('fs'),
  path = require('path');

module.exports = function findPackageJSON(startPath, ignore) {
  startPath = startPath || process.cwd();
  ignore = ignore || 0;
  var searchPath = path.join(startPath + '/..'), fileFound = false, nextPath = '';

  while(!fileFound) {
    searchPath = nextPath || searchPath;

    try {
      fs.statSync(path.join(searchPath + '/package.json'));
      if(ignore > 0) {
        ignore--;
      } else {
        fileFound = true;
      }
    } catch (e) {}

    nextPath = path.join(searchPath + '/..');
    if (nextPath === '/' || nextPath === '.' || nextPath === '..') {
      break;
    }
  }

  if (fileFound) {
    return {
      read: function() {
        return fs.readFileSync(path.join(searchPath + '/package.json'), 'utf8');
      },
      parse: function() {
        return JSON.parse(fs.readFileSync(path.join(searchPath + '/package.json'), 'utf8'));
      },
      path: path.join(searchPath + '/package.json')
    };
  } else {
    return false;
  }
};
