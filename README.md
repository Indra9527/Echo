# Sprint 2 Echo

#### Desciprtion

- The web application interface work with CSV file reader. It is used to provided a pretty interface and well interaction for the user.
- Here is the [repo](https://github.com/cs0320-s2023/sprint-2-dchen71-mke2 "Go").

##### contribution

Minghui Ke (mke2)

David Chen (dchen71)

## How to run

- Open the public/index.html by brower, the script alreay ready for the page.
- Type `help` as command to see how to use the web!
- Use `npm test` to test the testcases which used for the script and dom.
- **Note**
  - The program is raw and simple, All data is mocked and not do the real service.
  - The mode used to display command or not

## Design

- HTML & CSS
  - Based on gear up echo to redesign, use [bootstrap V5](https://getbootstrap.com/docs/5.2/getting-started/introduction/ "Go") to make the page pretty and user-friendly.
  - Use Flexbox to make the page adapt different size of screens.
- TypeScript & JavaScript
  - The project use TypeScript. Use `window.onload` to add listener event to the button and input.
  - After analysis the input, use `document.createElement()` to add new element in `repl_history` to show the result for the user.
  - Bascially get the input and show the output, the actual function will be done by backend.
- Improvement
  - Provided more search condition and make the command more clear.
  - Provided option for user to change the theme or something else for the page.

## Error

Since it is using mocked data, no error was found so far. It is static page right now

## Test

- DOM
  - check about the document element after running event function based on given template.
- main
  - Check simple help functions if work well.

---

Thanks for reading! 😂
