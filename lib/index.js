'use strict';
const fs = require('fs');
const path = require('path');

module.exports = function findPackageJSON(startPath, ignore) {
	startPath = startPath || process.cwd();
	ignore = ignore || 0;

	let searchPath = path.join(startPath + '/..');
	let fileFound = false;
	let nextPath = '';

	while (!fileFound) {
		searchPath = nextPath || searchPath;

		try {
			fs.statSync(path.join(searchPath + '/package.json'));
			if (ignore > 0) {
				ignore--;
			} else {
				fileFound = true;
			}
		} catch (err) {}

		nextPath = path.join(searchPath + '/..');
		if (nextPath === path.normalize('/') || nextPath === '.' || nextPath === '..') {
			break;
		}
	}

	if (fileFound) {
		return {
			read: function () {
				return fs.readFileSync(path.join(searchPath + '/package.json'), 'utf8');
			},
			parse: function () {
				return JSON.parse(fs.readFileSync(path.join(searchPath + '/package.json'), 'utf8'));
			},
			path: path.join(searchPath + '/package.json')
		};
	}

	return false;
};
