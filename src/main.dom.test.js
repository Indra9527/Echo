import "@testing-library/dom";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import * as main from "./main";
/**
 * Resets the DOM before every test
 */
var startHTML = "\n    <div class=\"repl\">\n    <div class=\"repl-history\">\n    <div>\n        <p class=\"commandText\">a</p>\n    </div>\n    </div>\n    <hr />\n    <div class=\"repl-input\">\n      <input\n        id=\"command\"\n        size=\"65\"\n        type=\"text\"\n        class=\"repl-command-box\"\n        placeholder=\"Enter Command here!\"\n      />\n      <button type=\"button\"  id=\"confirm\">\n        Confirm\n      </button>\n      <div class=\"mode\">\n        <p>Mode:</p>\n        <input\n          type=\"radio\"\n          id=\"brief\"\n          name=\"radio\"\n          checked\n        />\n        <label\n          for=\"brief\"\n        >\n          Brief\n        </label>\n        <input\n          type=\"radio\"\n          id=\"verbose\"\n          name=\"radio\"\n        />\n        <label\n          for=\"verbose\"\n        >\n          Verbose\n        </label>\n      </div>\n    </div>\n  </div>\n    ";
var repl_history;
var repl_command_input;
var confirmButton;
beforeEach(function () {
    // Set up a mock document containing the skeleton that index.html starts with
    document.body.innerHTML = startHTML;
    repl_command_input = screen.getByPlaceholderText("Enter Command here!");
    repl_history = document.getElementsByClassName("repl-history")[0];
    confirmButton = screen.getByText("Confirm");
});
test("repl-input exists", function () {
    var repl_input = document.getElementsByClassName("repl-input");
    expect(repl_input.length).toBe(1);
});
test("brief checked initial", function () {
    var brief = document.getElementById("brief");
    expect(brief).toBeChecked();
});
test("verbose checked make visible", function () {
    var verbose = document.getElementById("verbose");
    main.prepareRadio2();
    if (verbose == null)
        return;
    verbose.click();
    var commandText = document.getElementsByClassName("commandText").item(0);
    expect(commandText).toBeVisible;
});
test("brief checked make invisible", function () {
    var brief = document.getElementById("brief");
    main.prepareRadio1();
    if (brief == null)
        return;
    brief.click();
    var commandText = document.getElementsByClassName("commandText").item(0);
    expect(commandText).not.toBeVisible;
});
test("command to add result", function () {
    var history = document.getElementsByClassName("repl-history");
    main.prepareButton();
    userEvent.click(confirmButton);
    var his = history.item(0);
    expect(his === null || his === void 0 ? void 0 : his.childElementCount).toBe(2);
});
test("command load_file", function () {
    main.prepareKeypress();
    main.prepareButton();
    userEvent.type(repl_command_input, "load_file people.csv");
    userEvent.click(confirmButton);
    screen.findByText("loaded!");
    expect(repl_history.childElementCount).toBe(2);
});
test("command view no data loaded", function () {
    main.analysisCommand("view");
    screen.findAllByText("Invalid Command!");
    var table = document.getElementsByTagName("table");
    expect(table.length).toBe(1);
});
test("command view", function () {
    main.prepareKeypress();
    main.prepareButton();
    userEvent.type(repl_command_input, "load_file people.csv");
    userEvent.click(confirmButton);
    userEvent.type(repl_command_input, "view");
    userEvent.click(confirmButton);
    var tableRows = document.getElementsByTagName("tr");
    expect(tableRows.length).toBe(6);
});
test("command help", function () {
    main.analysisCommand("help");
    var helpMessage = screen.getAllByText("query data by given condition (exactaly)", { exact: false });
    expect(helpMessage.length).toBe(1);
});
test("command search", function () {
    var history = document.getElementsByClassName("repl-history");
    main.analysisCommand("search <0> <The>");
    screen.getAllByText("The");
    screen.getAllByText("song");
    var tableBlock = screen.getAllByText("remains")[0];
    expect(tableBlock.textContent).toBe("remains");
    screen.getAllByText("the");
    expect(screen.getAllByText("same.")[0]).toBeInTheDocument();
});
test("command query", function () {
    main.analysisCommand("query (and)");
    screen.getAllByText("Jerome Foley");
    screen.getAllByText("odio.sagittis.semper@icloud.couk");
    screen.getAllByText("Ap #788-1986 Molestie Road");
    screen.getAllByText("1-751-965-1253");
    screen.getAllByText("Rio Grande do Sul");
    expect(screen.getAllByText("France")[0]).toBeInTheDocument();
});
test("command invalid", function () {
    main.analysisCommand("invalidCommand");
    var invalidMessage = screen.getAllByText("Invalid Command!");
    expect(invalidMessage.length).toBe(1);
    expect(invalidMessage[0].textContent).toBe("Invalid Command!");
});
