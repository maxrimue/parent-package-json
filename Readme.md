# parent-package-json

[![Build Status](https://travis-ci.org/maxrimue/parent-package-json.svg)](https://travis-ci.org/maxrimue/parent-package-json)
[![Build status](https://ci.appveyor.com/api/projects/status/7rnfm4fct6y31ii6?svg=true)](https://ci.appveyor.com/project/maxrimue/parent-package-json)
[![Coverage Status](https://coveralls.io/repos/maxrimue/parent-package-json/badge.svg?branch=master&service=github)](https://coveralls.io/github/maxrimue/parent-package-json?branch=master)
[![dependencies Status](https://david-dm.org/maxrimue/parent-package-json/status.svg)](https://david-dm.org/maxrimue/parent-package-json)
[![devDependencies Status](https://david-dm.org/maxrimue/parent-package-json/dev-status.svg)](https://david-dm.org/maxrimue/parent-package-json?type=dev)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)


Using parent-package-json, you can find the parent `package.json`, so the `package.json` of the module that uses your module.

```shell
npm install --save parent-package-json
```

```javascript
var parent = require('parent-package-json');
```

## Getting started

For getting the path to the parent `package.json` of the executing module (so the module that runs this code), simply do:

```javascript
var pathToParent = parent().path;
```

If you're not sure if there's _always_ a parent package.json, you can check first, too:

```javascript
var pathToParent = parent(); // Will return false if no parent exists

if(pathToParent !== false) {
  pathToParent = pathToParent.path;
}
```

Usually, `parent-package-json` will use `process.cwd()` for starting at, it will search the parent folders up until `/` for finding a `package.json` (and stops as soon as it finds one). If you want it to start somewhere other than `process.cwd()`, provide a path as an argument instead:

```javascript
var pathToParentOfCustomPath = parent('/My/Cool/Folder').path;
```

If you want to ignore a `package.json` (for example to find the parent `package.json` of the parent module), you can pass an
ignore parameter (default: 0) saying how many `package.json`s you want to ignore when searching:

```javascript
var pathToParentOfParent = parent(null, 1).path; // Or, even more complicated:
var pathToParentOfParentOfCustomPath = parent('/My/Cool/Folder', 1).path;
```

__Note__: The module's own `package.json` is __always__ ignored, even if the ignore parameter equals 0
## Processing the data

`parent-package-json` also allows you reading the content of a `package.json`, and even parsing its JSON right away.   

For reading its content, do:

```javascript
var contentOfParent = parent().read();
```

If you want to parse its JSON code, you can run:

```javascript
var JSONOfParent = parent().parse();
var versionOfParent = JSONOfParent.version;

// Or

var versionOfParent = parent().parse().version;
```
