import path from "path";
import parent from "./index.js";
import { expect, it } from "vitest";

it("finds the right package.json", () => {
	const result = parent({
		startPath: "fixtures/firstFolder/secondFolder",
	});
	const expected = path.normalize("fixtures/firstFolder/package.json");

	expect(result.path.relative).toBe(expected);
});

it("ignores one package.json", () => {
	const result = parent({
		startPath: "fixtures/firstFolder/secondFolder/thirdFolder/fourthFolder",
		ignoreCount: 1,
	});
	const expected = path.normalize("fixtures/firstFolder/package.json");

	expect(result.path.relative).toBe(expected);
});

it("reads package.json", () => {
	const result = parent({
		startPath: "fixtures/firstFolder/secondFolder",
	});
	const packageVersion = JSON.parse(result.read() ?? "{}").version;

	expect(result).toBeDefined();
	expect(packageVersion).toBe("1.0.0");
});

it("parses package.json", () => {
	const result = parent({
		startPath: "fixtures/firstFolder/secondFolder",
	});
	const expected = { version: "1.0.0" };

	expect(result.parse()).toEqual(expected);
});

it("fails at finding package.json", () => {
	const result = parent({ startPath: "/" });

	expect(result.parse()).toBeUndefined();
	expect(result.read()).toBeUndefined();
	expect(result.path.absolute).toBeUndefined();
	expect(result.path.relative).toBeUndefined();
});
