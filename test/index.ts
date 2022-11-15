import path from "node:path";
import test from "ava";
import parent from "../lib/index.js";

test("find right package.json", (t) => {
	t.is(
		parent({ startPath: "./test/fixtures/firstFolder/secondFolder" }).path,
		path.normalize("test/fixtures/firstFolder/package.json")
	);
});

test("ignore one package.json", (t) => {
	t.is(
		parent({
			startPath:
				"./test/fixtures/firstFolder/secondFolder/thirdFolder/fourthFolder",
			ignoreCount: 1,
		}).path,
		path.normalize("test/fixtures/firstFolder/package.json")
	);
});

test("read package.json", (t) => {
	const result = parent({
		startPath: "./test/fixtures/firstFolder/secondFolder",
	}).read();

	t.not(result, undefined);
	t.deepEqual(
		JSON.parse(
			parent({
				startPath: "./test/fixtures/firstFolder/secondFolder",
			}).read()!
		),
		{ version: "1.0.0" }
	);
});

test("parse package.json", (t) => {
	t.deepEqual(
		parent({ startPath: "./test/fixtures/firstFolder/secondFolder" }).parse(),
		{
			version: "1.0.0",
		}
	);
});

test("fail at finding package.json", (t) => {
	const result = parent({ startPath: "/" });

	t.is(result.parse(), undefined);
	t.is(result.read(), undefined);
	t.is(result.path, undefined);
});
