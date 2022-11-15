import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import process from "node:process";

const parentPackageJson = (startPath, ignore) => {
	startPath = startPath || process.cwd();
	ignore = ignore || 0;

	let searchPath = path.join(startPath + "/..");
	let fileFound = false;
	let nextPath = "";

	while (!fileFound) {
		searchPath = nextPath || searchPath;

		try {
			fs.statSync(path.join(searchPath + "/package.json"));
			if (ignore > 0) {
				ignore--;
			} else {
				fileFound = true;
			}
		} catch {}

		nextPath = path.join(searchPath + "/..");
		// Linux root is "/"
		// Windows root is "C:\" or any other drive letter
		const root =
			os.platform() === "win32"
				? nextPath.split(path.sep)[0] + path.sep
				: path.normalize("/");
		if (nextPath === root || nextPath === "." || nextPath === "..") {
			break;
		}
	}

	if (fileFound) {
		return {
			read() {
				return fs.readFileSync(path.join(searchPath + "/package.json"), "utf8");
			},
			parse() {
				return JSON.parse(
					fs.readFileSync(path.join(searchPath + "/package.json"), "utf8")
				);
			},
			path: path.join(searchPath + "/package.json"),
		};
	}

	return false;
};

export default parentPackageJson;
