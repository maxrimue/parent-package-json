import path from "path";
import parent from "./index.js";
import { expect, it } from "vitest";

it.only("finds the right package.json", () => {
	const packagePath = parent({
		startPath: "../fixtures/firstFolder/secondFolder",
	}).path;
	const expected = path.normalize("../fixtures/firstFolder/package.json");

	expect(packagePath).toBe(expected);
});

it("ignores one package.json", () => {
	const packagePath = parent({
		startPath: "../fixtures/firstFolder/secondFolder/thirdFolder/fourthFolder",
		ignoreCount: 1,
	}).path;
	const expected = path.normalize("../fixtures/firstFolder/package.json");

	expect(packagePath).toBe(expected);
});

it("reads package.json", () => {
	const packageContent = parent({
		startPath: "../fixtures/firstFolder/secondFolder",
	}).read();
	const packageVersion = JSON.parse(packageContent!).version;

	expect(packageContent).toBeDefined();
	expect(packageVersion).toBe("1.0.0");
});

it("parses package.json", () => {
	const packageJSON = parent({
		startPath: "../fixtures/firstFolder/secondFolder",
	}).parse();
	const expected = { version: "1.0.0" };

	expect(packageJSON).toEqual(expected);
});

it("fails at finding package.json", () => {
	const result = parent({ startPath: "/" });

	expect(result.parse()).toBeUndefined();
	expect(result.read()).toBeUndefined();
	expect(result.path).toBeUndefined();
});
