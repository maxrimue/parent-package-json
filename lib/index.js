var fs = require('fs'),
  path = require('path');

module.exports = function findPackageJSON(startPath) {
  startPath = startPath || process.cwd();
  var searchPath = path.join(startPath + '/..');

  for (var fileFound = false, nextPath; !fileFound; searchPath = path.join(searchPath + '/..')) {
    try {
      fs.statSync(path.join(searchPath + '/package.json'));
      fileFound = true;
      break;
    } catch (e) {}

    nextPath = path.join(searchPath + '/..');
    if (nextPath === '/' || nextPath === '.' || nextPath === '..') {
      break;
    }
  }

  if (!!fileFound) {
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
