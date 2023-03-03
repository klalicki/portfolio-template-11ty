module.exports = function (eleventyConfig) {
  // Return your Object options:
  eleventyConfig.addPassthroughCopy('./src/assets');
  return {
    passthroughFileCopy:true,
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
