import path from "path";
import { test } from "ava";
import parent from "../lib";

test("find right package.json", t => {
	t.is(
		parent("./test/fixtures/firstFolder/secondFolder").path,
		path.normalize("test/fixtures/firstFolder/package.json")
	);
});

test("ignore one package.json", t => {
	t.is(
		parent(
			"./test/fixtures/firstFolder/secondFolder/thirdFolder/fourthFolder",
			1
		).path,
		path.normalize("test/fixtures/firstFolder/package.json")
	);
});

test("read package.json", t => {
	t.deepEqual(
		JSON.parse(parent("./test/fixtures/firstFolder/secondFolder").read()),
		{ version: "1.0.0" }
	);
});

test("parse package.json", t => {
	t.deepEqual(parent("./test/fixtures/firstFolder/secondFolder").parse(), {
		version: "1.0.0"
	});
});

test("fail at finding package.json", t => {
	t.is(parent("/"), false);
});
