
# Business Automation Workflow JS Utilities

A modular JavaScript utility library for automating business workflows in IBM Business Automation Workflow (BAW). This project includes helpers for data generation, logging, date handling, string manipulation, input validation, and more.

---

## 🔗 Live Documentation

The full API documentation is available here:  
👉 [https://businessautomationworkflow.github.io/js/](https://businessautomationworkflow.github.io/js/)

Documentation is automatically generated using [JSDoc](https://jsdoc.app/).

---

## 📦 Included Modules

| File              | Description                                      |
|-------------------|--------------------------------------------------|
| `data_generation.js` | Functions to generate mock/test data              |
| `date_helpers.js`    | Utilities for working with dates and times       |
| `logging.js`         | Lightweight logging functionality                |
| `string_utils.js`    | Common string formatting and parsing helpers     |
| `validation.js`      | Input and type validation functions              |
| `misc.js`            | Miscellaneous utilities not covered elsewhere    |

---

## 🚀 Usage in IBM BAW

To use these utilities in your **IBM Business Automation Workflow (BAW)** environment:

1. **Add the JavaScript files as server files** to your **Application** or **Toolkit**:
   - In the BAW Designer or Process Designer, go to the **Files** section.
   - Upload each `.js` file (`data_generation.js`, `logging.js`, etc.) as **server files**.

2. **Use functions in your JavaScript logic** within services, scripts, or client-side UIs:
   ```javascript
   // Example usage inside a service script
   var mockData = generateMockData();
   logInfo("Generated data: " + JSON.stringify(mockData));
   ```

> Ensure that functions used are globally scoped in each file or expose what you need from them.

---

## 🛠️ Generating Documentation

To regenerate the JSDoc-based documentation:

1. Install JSDoc (if not already installed):
   ```bash
   npm install -g jsdoc
   ```

2. From the root of the project, run:
   ```bash
   jsdoc . -r -d docs
   ```

This will update the `docs/` folder with new HTML documentation.

---

## 📁 Repository Structure

```
js/
├── data_generation.js
├── date_helpers.js
├── logging.js
├── misc.js
├── string_utils.js
├── validation.js
├── docs/
│   └── index.html (JSDoc-generated site)
└── README.md
```

---

## 📃 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! If you’d like to add new helpers or improve existing ones for BAW environments, feel free to open issues or pull requests.
