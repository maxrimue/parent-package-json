import fs from "fs";
import path from "path";
import process from "process";

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
	/** Relative and absolute path to the found package.json file. */
	path: {
		absolute: string | undefined;
		relative: string | undefined;
	};
};

/** Looks for the nearest parent package.json. */
const parentPackageJSON = ({
	startPath = process.cwd(),
	ignoreCount = 0,
}: Parameters): Result => {
	const root = path.parse(process.cwd()).root;

	let currentSearchPath = path.join(startPath, "/..");
	let resultPath: string | undefined = undefined;
	let ignoredFiles = 0;

	while (resultPath === undefined) {
		const currentAbsolutePath = path.resolve(currentSearchPath);
		if (currentAbsolutePath === root) {
			break;
		}

		const currentFilePath = path.normalize(
			path.join(currentSearchPath, "package.json"),
		);

		if (fs.existsSync(currentFilePath)) {
			if (ignoreCount > ignoredFiles) {
				ignoredFiles++;
			} else {
				resultPath = currentFilePath;
			}
		}

		currentSearchPath = path.join(currentSearchPath, "/..");
	}

	return {
		read: () => resultPath && fs.readFileSync(resultPath, "utf8"),
		parse: () => resultPath && JSON.parse(fs.readFileSync(resultPath, "utf8")),
		path: {
			absolute: resultPath ? path.resolve(resultPath) : undefined,
			relative: resultPath,
		},
	};
};

export default parentPackageJSON;
