# parent-package-json

Find, read and parse the `package.json` that sits above your module. Provide a custom ignore count or start path to define where to look for a parent package.

```shell
npm install --save parent-package-json
```

```javascript
import parentJSON from "parent-package-json";
```

## Getting Started

To get the nearest parent `package.json`s path, content (as string) or parsed content (using JSON.parse):

```javascript
const parent = parentJSON();

const pathToParentPackageJSON = parent.path.relative;
const parentContentAsString = parent.read();
const parentContentAsObject = parent.parse();

const parentVersion = parentContentAsObject.version;
```

The parent `package.json` is looked up starting from the current working directory of your script. If none is found, paths, `.read()` and `.parse()` will return `undefined`.

## Custom Path and Ignore Count

If you need to determine the parent `package.json` of a custom path instead of the current working directory, which should be the module from which you are running the code, you can specify it via the `path` option:

```javascript
const startPath = path.join(...);
const parent = parent({ startPath });
```

You can also specify a count of parent directories to skip:

```javascript
const parent = parent({ ignoreCount: 1 });
```

**Note**: A `package.json` file in the provided `startPath` is always ignored. Set the `startPath` one layer below the one where you expect to find a parent package file.
