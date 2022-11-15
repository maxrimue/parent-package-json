import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import process from "node:process";

type Parameters = {
	/** Path where first lookup is performed. Defaults to current working directory.  */
	startPath?: string;
	/** Number of package.json files to ignore. Defaults to zero. */
	ignoreCount?: number;
};

type Result = {
	/** Reads the package.json file and returns the content as string. */
	read: () => string | undefined;
	/** Reads the package.json file and parses its content as JSON. */
	parse: () => Record<string, unknown> | undefined;
	/** Path to the found package.json file. */
	path: string | undefined;
};

/** Looks for the nearest parent package.json. */
const parentPackageJson = ({
	startPath = process.cwd(),
	ignoreCount = 0,
}: Parameters): Result => {
	let searchPath = path.join(startPath + "/..");
	let fileFound = false;
	let nextPath = "";
	let ignoredFiles = 0;

	while (!fileFound) {
		searchPath = nextPath || searchPath;

		try {
			fs.statSync(path.join(searchPath + "/package.json"));
			if (ignoreCount > ignoredFiles) {
				ignoredFiles++;
			} else {
				fileFound = true;
			}
		} catch {}

		nextPath = path.join(searchPath + "/..");

		const root =
			os.platform() === "win32"
				? nextPath.split(path.sep)[0] + path.sep
				: path.normalize("/");

		if (nextPath === root || nextPath === "." || nextPath === "..") {
			break;
		}
	}

	return {
		read: () =>
			fileFound
				? fs.readFileSync(path.join(searchPath + "/package.json"), "utf8")
				: undefined,
		parse: () =>
			fileFound
				? (JSON.parse(
						fs.readFileSync(path.join(searchPath + "/package.json"), "utf8")
				  ) as Record<string, unknown>)
				: undefined,
		path: fileFound ? path.join(searchPath + "/package.json") : undefined,
	};
};

export default parentPackageJson;
