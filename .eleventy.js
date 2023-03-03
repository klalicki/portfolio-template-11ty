module.exports = function (eleventyConfig) {
  // Return your Object options:
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/img");
  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
