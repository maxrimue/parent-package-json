const path = require('path');
const test = require('ava').test;
const parent = require('../lib/index.js');

test('find right package.json', t => {
	t.is(parent('./fixtures/firstFolder/secondFolder').path, path.normalize('fixtures/firstFolder/package.json'));
});

test('ignore one package.json', t => {
	t.is(parent('./fixtures/firstFolder/secondFolder/thirdFolder/fourthFolder', 1).path, path.normalize('fixtures/firstFolder/package.json'));
});

test('read package.json', t => {
	t.deepEqual(JSON.parse(parent('./fixtures/firstFolder/secondFolder').read()), {version: '1.0.0'});
});

test('parse package.json', t => {
	t.deepEqual(parent('./fixtures/firstFolder/secondFolder').parse(), {version: '1.0.0'});
});

test('fail at finding package.json', t => {
	t.is(parent('/'), false);
});
