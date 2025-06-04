const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '3c4yog',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
