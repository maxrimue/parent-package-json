# parent-package-json

Using parent-package-json, you can find the parent `package.json`, so the `package.json` of the module that uses your module.

```shell
npm install --save parent-package-json
```

```javascript
const parent = require('parent-package-json');
```

## Getting started

For getting the path to the parent `package.json` of the executing module (so the module that runs this code), simply do:

```javascript
const pathToParent = parent().path;
```

If you're not sure if there's _always_ a parent package.json, you can check first, too:

```javascript
const pathToParent = parent(); // Will return false if no parent exists

if (pathToParent !== false) {
	pathToParent = pathToParent.path;
}
```

Usually, `parent-package-json` will use `process.cwd()` for starting at, it will search the parent folders up until `/` for finding a `package.json` (and stops as soon as it finds one). If you want it to start somewhere other than `process.cwd()`, provide a path as an argument instead:

```javascript
const pathToParentOfCustomPath = parent('/My/Cool/Folder').path;
```

If you want to ignore a `package.json` (for example to find the parent `package.json` of the parent module), you can pass an
ignore parameter (default: 0) saying how many `package.json`s you want to ignore when searching:

```javascript
const pathToParentOfParent = parent(null, 1).path; // Or, even more complicated:
const pathToParentOfParentOfCustomPath = parent('/My/Cool/Folder', 1).path;
```

**Note**: The module's own `package.json` is **always** ignored, even if the ignore parameter equals 0

## Processing the data

`parent-package-json` also allows you reading the content of a `package.json`, and even parsing its JSON right away.

For reading its content, do:

```javascript
const contentOfParent = parent().read();
```

If you want to parse its JSON code, you can run:

```javascript
const JSONOfParent = parent().parse();
const versionOfParent = JSONOfParent.version;

// Or

const versionOfParent = parent().parse().version;
```
