# parent-package-json

Using parent-package-json, you can find the parent `package.json`, so the `package.json` of the module that uses your module.

```shell
npm install --save parent-package-json
```

```javascript
import parent from "parent-package-json";
```

## Getting Started

To get the nearest parent `package.json`s path, content (as string) or parsed content (using JSON.parse):

```javascript
const parent = parent();

const pathToParentPackageJSON = parent.path;
const parentContentAsString = parent.read();
const parentContentAsObject = parent.parse();

const parentVersion = parentContentAsObject.version;
```

The parent `package.json` is looked up starting from the current working directory of your script. If none is found, `.path`, `.read()` and `.parse()` will return `undefined`.

## Custom Path and Ignore Count

If you need to determine the parent `package.json` of a custom path instead of the current working directory, you can specify it via the `path` option:

```javascript
const startPath = path.join(...);
const parent = parent({ startPath });
```

You can also specify a count of parent directories to skip:

```javascript
const parent = parent({ ignoreCount: 1 });
```

**Note**: The module's own `package.json` is **always** ignored, even if the ignore parameter equals 0.
