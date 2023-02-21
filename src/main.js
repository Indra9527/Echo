import { file, searchData, queryData } from "./mockedJson.js";
var currData = [];
var modeBrief = true;
// The window.onload callback is invoked when the window is first loaded by the browser
window.onload = function () {
    prepareRadio1();
    prepareRadio2();
    prepareButton();
    prepareKeypress();
};
/**
 * add listener to keypress to make `enter` act like button
 */
function prepareKeypress() {
    var maybeInputs = document.getElementsByClassName("repl-command-box");
    var maybeInput = maybeInputs.item(0);
    if (maybeInput == null) {
        console.log("Couldn't find input element");
    }
    else if (!(maybeInput instanceof HTMLInputElement)) {
        console.log("Found element ".concat(maybeInput, ", but it wasn't an input"));
    }
    else {
        maybeInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                handleButton(new MouseEvent("click"));
            }
        });
    }
}
/**
 * add handleButton to the button listener
 */
function prepareButton() {
    var maybeInput = document.getElementById("confirm");
    if (maybeInput == null) {
        console.log("Couldn't find input element");
    }
    else if (!(maybeInput instanceof HTMLButtonElement)) {
        console.log("Found element ".concat(maybeInput, ", but it wasn't an input"));
    }
    else {
        maybeInput.addEventListener("click", handleButton);
    }
}
/**
 * handle the `confirm` button to add result to history
 */
function handleButton(event) {
    var maybeInput = document.getElementById("command");
    if (maybeInput == null) {
        console.log("Couldn't find input element");
    }
    else if (!(maybeInput instanceof HTMLInputElement)) {
        console.log("Found element ".concat(maybeInput, ", but it wasn't an input"));
    }
    else {
        var command = maybeInput.value;
        analysisCommand(command);
        // empty input space
        maybeInput.value = "";
    }
}
/**
 * check the command and do the corresponding job
 * @param command the given command
 */
function analysisCommand(command) {
    var list = command.trim().split(" ");
    if (list.length == 0) {
        return;
    }
    var cmd = list[0].toLowerCase();
    switch (cmd) {
        case "load_file":
            loadFile(list[1]);
            break;
        case "view":
            viewData(currData, command);
            break;
        case "search":
            var res = parseCondition(command);
            search(command, res[0], res[1]);
            break;
        case "query":
            var res = parseQuery(command);
            query(command, res);
            break;
        case "help":
            help(command);
            break;
        default:
            findElementToDo("repl-history", function (div) {
                var output = document.createElement("div");
                output.classList.add("result");
                appendCommand(output, "<" + command + ">");
                appendResultP(output, "Invalid Command!");
                div.appendChild(output);
                div.scrollTop = div.scrollHeight;
            });
    }
}
/**
 * handle load csv file, prepare for backend
 * @param filename csv file name to load
 */
function loadFile(filename) {
    if (filename == undefined)
        return;
    if (filename in file) {
        var statement = "";
        currData = file[filename];
        statement = "<" + filename + "> loaded!";
    }
    else {
        statement = "<" + filename + "> not found!";
    }
    findElementToDo("repl-history", function (div) {
        var output = document.createElement("div");
        output.classList.add("result");
        appendCommand(output, "<load_file " + filename + ">");
        appendResultP(output, statement);
        div.appendChild(output);
        div.scrollTop = div.scrollHeight;
    });
}
/**
 * handle to show the table, prepare for backend
 * @param data the data to view, 2-D array
 */
function viewData(data, statement) {
    if (data == undefined || data.length === 0) {
        findElementToDo("repl-history", function (div) {
            var output = document.createElement("div");
            output.classList.add("result");
            appendCommand(output, "<" + statement + ">:");
            appendResultP(output, "No data loaded yet.");
            div.appendChild(output);
            div.scrollTop = div.scrollHeight;
        });
    }
    else {
        findElementToDo("repl-history", function (div) {
            var output = document.createElement("div");
            output.classList.add("result");
            appendCommand(output, "<" + statement + ">:");
            appendTable(output, data);
            div.appendChild(output);
            div.scrollTop = div.scrollHeight;
        });
    }
}
/**
 * handle to search the data, prepare for backend
 * @param column column index or name
 * @param keyword keyword to search
 */
function search(command, column, keyword) {
    if (column == undefined || keyword == undefined) {
        findElementToDo("repl-history", function (div) {
            var output = document.createElement("div");
            output.classList.add("result");
            appendCommand(output, command);
            appendResultP(output, "Invalid Command!");
            div.appendChild(output);
            div.scrollTop = div.scrollHeight;
        });
    }
    if ((column == "0" || column == "") && keyword == "The") {
        viewData(searchData.t, command);
    }
    else if ((column == "0" || column == "") && keyword == "Tasha Ferguson") {
        viewData(searchData.p, command);
    }
    else if ((column == "name" || column == "") &&
        keyword == "Tasha Ferguson") {
        viewData(searchData.p, command);
    }
}
/**
 * For CSCI 1340
 * Handle the query, prepare for backend
 * @param command conmand line
 * @param list list of nested query
 */
function query(command, list) {
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var query = list_1[_i];
        var condition = parseCondition(query);
        if (query.trim().split(" ")[0].toLowerCase() == "not") {
            viewData(queryData.not, command);
        }
        else if (query.trim().split(" ")[0].toLowerCase() == "and") {
            viewData(queryData.and, command);
        }
        else if (query.trim().split(" ")[0].toLowerCase() == "or") {
            console.log(condition);
        }
    }
}
var helpCommandOutput = "<load_file fileName> -> load the csv file from given file name. <view> -> show the all data of current loaded file.\n<search <column> <keyword>> -> search the data with given condition (exactaly)\n<query (and <c1> <k1> <c2> <k2>) (not <c> <k>) (not <c1> <k1> <c2> <k2>)> -> query data by given condition (exactaly)";
export { helpCommandOutput };
/**
 * show the help command line
 * @param command command
 */
function help(command) {
    if (command == undefined || command == null)
        return;
    findElementToDo("repl-history", function (div) {
        var output = document.createElement("div");
        output.classList.add("result");
        appendCommand(output, command);
        appendResultP(output, helpCommandOutput);
        div.appendChild(output);
        div.scrollTop = div.scrollHeight;
    });
}
/**
 * seperate the string with ()
 * @param line gievn string
 * @returns list of string
 */
function parseQuery(line) {
    var res = [];
    var curr = "";
    var beg = false;
    for (var i = 0; i < line.length; i++) {
        if (line[i] === "(") {
            beg = true;
            curr = "";
        }
        else if (line[i] === ")") {
            beg = false;
            res.push(curr);
            curr = "";
        }
        else {
            if (beg) {
                curr += line[i];
            }
        }
    }
    return res;
}
/**
 * seperate the string with <>
 * @param line gievn string
 * @returns list of string
 */
function parseCondition(line) {
    var res = [];
    var curr = "";
    var beg = false;
    for (var i = 0; i < line.length; i++) {
        if (line[i] === "<") {
            beg = true;
            curr = "";
        }
        else if (line[i] === ">") {
            beg = false;
            res.push(curr);
            curr = "";
        }
        else {
            if (beg) {
                curr += line[i];
            }
        }
    }
    return res;
}
/**
 * append paragraph to given element with given text
 * @param output div element to add table
 * @param text text to add
 */
function appendCommand(output, text) {
    if (output == null || !(output instanceof HTMLDivElement))
        return;
    var p = document.createElement("p");
    p.innerText = text;
    p.classList.add("commandText");
    p.classList.add("font-monospace");
    p.classList.add("fw-bold");
    if (modeBrief) {
        p.classList.add("invisible");
    }
    output.appendChild(p);
}
/**
 * append paragraph to given element with given text
 * @param output div element to add table
 * @param text text to add
 */
function appendResultP(output, text) {
    if (output == null || !(output instanceof HTMLDivElement))
        return;
    var p = document.createElement("p");
    p.textContent = text;
    p.classList.add("ResultText");
    p.classList.add("font-monospace");
    p.classList.add("fst-normal");
    output.appendChild(p);
}
/**
 * append table to given element with given data in table view
 * @param output div element to add table
 * @param data data of table to add
 */
function appendTable(output, data) {
    if (output == null || !(output instanceof HTMLDivElement))
        return;
    var table = document.createElement("table");
    var tblBody = document.createElement("tbody");
    for (var i = 0; i < data.length; i++) {
        // table row creation
        var row = document.createElement("tr");
        var rowData = data[i];
        for (var j = 0; j < rowData.length; j++) {
            // create element <td> and text node
            //Make text node the contents of <td> element
            // put <td> at end of the table row
            var cell = document.createElement("td");
            var cellText = document.createTextNode("" + rowData[j]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        //row added to end of table body
        tblBody.appendChild(row);
    }
    table.appendChild(tblBody);
    // make pretty
    table.classList.add("table");
    table.classList.add("table-danger");
    table.classList.add("table-striped-columns");
    output.appendChild(table);
}
/**
 * add listener to the `brief` radio
 */
function prepareRadio1() {
    var maybeInput = document.getElementById("brief");
    if (maybeInput == null) {
        console.log("Couldn't find input element");
    }
    else if (!(maybeInput instanceof HTMLInputElement)) {
        console.log("Found element ".concat(maybeInput, ", but it wasn't an input"));
    }
    else {
        maybeInput.addEventListener("change", function () {
            modeBrief = true;
            findElementToDo("commandText", function (command) {
                return command.classList.add("invisible");
            });
        });
    }
}
/**
 * add listener to the `verbose` radio
 */
function prepareRadio2() {
    var maybeInput = document.getElementById("verbose");
    if (maybeInput == null) {
        console.log("Couldn't find input element");
    }
    else if (!(maybeInput instanceof HTMLInputElement)) {
        console.log("Found element ".concat(maybeInput, ", but it wasn't an input"));
    }
    else {
        maybeInput.addEventListener("change", function () {
            modeBrief = false;
            findElementToDo("commandText", function (command) {
                return command.classList.remove("invisible");
            });
        });
    }
}
/**
 * use given classname to loop the element and use given function to do with each element
 *
 * @param className the classname of element
 * @param fun the function that the element need to do
 */
function findElementToDo(className, fun) {
    var elements = document.getElementsByClassName(className);
    if (elements == null)
        return;
    for (var i = 0; i < elements.length; i++) {
        var element = elements.item(i);
        if (element == null) {
            console.log("Couldn't find input element");
        }
        else if (!(element instanceof HTMLElement)) {
            console.log("Found element ".concat(element, ", but it wasn't a p"));
        }
        else {
            fun(element);
        }
    }
}
function getResultText() {
    var elements = document.getElementsByClassName("ResultText");
    if (elements.length == 0)
        return;
    var resultText = elements[0];
    return resultText.innerHTML;
}
// Provide this to other modules (e.g., for testing!)
// The configuration in this project will require /something/ to be exported.
export { appendTable, appendResultP, appendCommand, parseCondition, parseQuery, findElementToDo, prepareRadio2, prepareRadio1, help, query, search, viewData, loadFile, analysisCommand, handleButton, prepareButton, prepareKeypress, getResultText, };
