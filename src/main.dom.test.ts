import "@testing-library/dom";
import "@testing-library/jest-dom";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import * as main from "./main";

/**
 * Resets the DOM before every test
 */
const startHTML = `
    <div class="repl">
    <div class="repl-history">
    <div>
        <p class="commandText">a</p>
    </div>
    </div>
    <hr />
    <div class="repl-input">
      <input
        id="command"
        size="65"
        type="text"
        class="repl-command-box"
        placeholder="Enter Command here!"
      />
      <button type="button"  id="confirm">
        Confirm
      </button>
      <div class="mode">
        <p>Mode:</p>
        <input
          type="radio"
          id="brief"
          name="radio"
          checked
        />
        <label
          for="brief"
        >
          Brief
        </label>
        <input
          type="radio"
          id="verbose"
          name="radio"
        />
        <label
          for="verbose"
        >
          Verbose
        </label>
      </div>
    </div>
  </div>
    `;

let repl_history: Element
let repl_command_input: Element
let confirmButton: Element

beforeEach(() => {
  // Set up a mock document containing the skeleton that index.html starts with
  document.body.innerHTML = startHTML
  repl_command_input = screen.getByPlaceholderText("Enter Command here!")
  repl_history = document.getElementsByClassName("repl-history")[0]
  confirmButton = screen.getByText("Confirm")
});

test("repl-input exists", () => {
  let repl_input: HTMLCollectionOf<Element> =
    document.getElementsByClassName("repl-input");
  expect(repl_input.length).toBe(1);
});

test("brief checked initial", () => {
  let brief: HTMLElement | null = document.getElementById("brief");
  expect(brief).toBeChecked();
});

test("verbose checked make visible", () => {
  let verbose: HTMLElement | null = document.getElementById("verbose");
  main.prepareRadio2();
  if (verbose == null) return;
  verbose.click();
  let commandText = document.getElementsByClassName("commandText").item(0);
  expect(commandText).toBeVisible;
});

test("brief checked make invisible", () => {
  let brief: HTMLElement | null = document.getElementById("brief");
  main.prepareRadio1();
  if (brief == null) return;
  brief.click();
  let commandText = document.getElementsByClassName("commandText").item(0);
  expect(commandText).not.toBeVisible;
});

test("command to add result", () => {
  let history: HTMLCollectionOf<Element> =
    document.getElementsByClassName("repl-history");
  main.prepareButton();
  userEvent.click(confirmButton)
  let his = history.item(0);
  expect(his?.childElementCount).toBe(2);
});

test("command load_file", () => {
  main.prepareKeypress()
  main.prepareButton()
  userEvent.type(repl_command_input, "load_file people.csv")
  userEvent.click(confirmButton)
  screen.findByText("loaded!")
  expect(repl_history.childElementCount).toBe(2)
});

test("command view no data loaded", () => {
  main.analysisCommand("view");
  screen.findAllByText("Invalid Command!");
  let table: HTMLCollectionOf<Element> = document.getElementsByTagName("table");
  expect(table.length).toBe(1);
});

test("command view", () => {
  main.prepareKeypress()
  main.prepareButton()
  userEvent.type(repl_command_input, "load_file people.csv")
  userEvent.click(confirmButton)
  userEvent.type(repl_command_input, "view")
  userEvent.click(confirmButton)
  let tableRows: HTMLCollectionOf<Element> =
    document.getElementsByTagName("tr");
  expect(tableRows.length).toBe(6);
});

test("command help", () => {
  main.analysisCommand("help");
  let helpMessage = screen.getAllByText(
    "query data by given condition (exactaly)",
    { exact: false }
  );
  expect(helpMessage.length).toBe(1);
});

test("command search", () => {
  let history: HTMLCollectionOf<Element> =
    document.getElementsByClassName("repl-history");
  main.analysisCommand("search <0> <The>");
  screen.getAllByText("The");
  screen.getAllByText("song");
  let tableBlock: Element = screen.getAllByText("remains")[0];
  expect(tableBlock.textContent).toBe("remains");
  screen.getAllByText("the");
  expect(screen.getAllByText("same.")[0]).toBeInTheDocument();
});

test("command query", () => {
  main.analysisCommand("query (and)");
  screen.getAllByText("Jerome Foley");
  screen.getAllByText("odio.sagittis.semper@icloud.couk");
  screen.getAllByText("Ap #788-1986 Molestie Road");
  screen.getAllByText("1-751-965-1253");
  screen.getAllByText("Rio Grande do Sul");
  expect(screen.getAllByText("France")[0]).toBeInTheDocument();
});

test("command invalid", () => {
  main.analysisCommand("invalidCommand");
  let invalidMessage = screen.getAllByText("Invalid Command!");
  expect(invalidMessage.length).toBe(1);
  expect(invalidMessage[0].textContent).toBe("Invalid Command!");
});
