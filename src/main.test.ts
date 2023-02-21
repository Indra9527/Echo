import "@testing-library/dom";
import "@testing-library/jest-dom";
// all exports from main will now be available as main.X
import * as main from "./main";

test("is 1 + 1 = 2?", () => {
  expect(1 + 1).toBe(2);
});

// Notice: we're testing the keypress handler's effect on state and /nothing else/
// We're not actually pressing keys!
// We're not looking at what the console produces!
test("add Table", () => {
  var output = document.createElement("div");
  main.appendTable(output, [["1"]]);
  expect(output).not.toBeEmptyDOMElement();
});

test("add text", () => {
  var output = document.createElement("div");
  main.appendResultP(output, "x");
  expect(output).not.toBeEmptyDOMElement();
});

test("add command", () => {
  var output = document.createElement("div");
  main.appendCommand(output, "x");
  expect(output).not.toBeEmptyDOMElement();
});

test("parse condition", function () {
  var list = main.parseCondition("<123> <456>");
  expect(list).toEqual(["123", "456"]);
});

test("parse condition", function () {
  var list = main.parseCondition("123> <456>");
  expect(list).toEqual(["", "456"]);
});

test("parse query", function () {
  var list = main.parseQuery("(123) (456)");
  expect(list).toEqual(["123", "456"]);
});

test("parse query", function () {
  var list = main.parseQuery("((123) (456))");
  expect(list).toEqual(["123", "456", ""]);
});
