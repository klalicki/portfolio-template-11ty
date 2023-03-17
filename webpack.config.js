const path = require("path");

module.exports = {
  entry: "./script-src/index.js",
  output: {
    path: path.resolve(__dirname, "src/assets/js"),
    filename: "bundle.js",
  },
  watch: true,
};
