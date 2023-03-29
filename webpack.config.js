const path = require("path");

module.exports = {
  entry: "./script-src/index.js",
  output: {
    path: path.resolve(__dirname, "theme/assets/js"),
    filename: "bundle.js",
  },
  watch: true,
};
