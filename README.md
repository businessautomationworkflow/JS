# Business Automation Workflow JS Utilities

A modular JavaScript utility library designed for use with IBM Business Automation Workflow (BAW). It includes reusable helpers for common business automation needs such as data generation, logging, date manipulation, and input validation.

---

## 🔗 Live Documentation

Full API documentation is available here:  
👉 [https://businessautomationworkflow.github.io/js/](https://businessautomationworkflow.github.io/js/)

Generated automatically using [JSDoc](https://jsdoc.app/).

---

## 📦 Included Modules

| File               | Description                                 |
|--------------------|---------------------------------------------|
| `datahelper.js`     | Utilities for generating random or test data |
| `datehelper.js`     | Helpers for working with dates and time      |
| `loghelper.js`      | Simple console-based logging utilities       |
| `validationhelper.js` | Input, format, and type validation functions |

---

## 🚀 Usage in IBM BAW

To use these helper modules in your **IBM Business Automation Workflow** project:

1. **Add JavaScript files to your BAW application/toolkit**:
   - Navigate to the **Files** section in BAW Designer or Process Designer.
   - Upload each `.js` file (e.g., `datahelper.js`, `loghelper.js`, etc.) as **server files**.

2. **Use helper functions inside scripts and services**:
   ```javascript
   // Example usage
   var id = datahelper.getRandomId();
   loghelper.logInfo("Generated ID: " + id);
