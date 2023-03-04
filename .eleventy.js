module.exports = function (eleventyConfig) {
  // Return your Object options:
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addCollection("projectSorted", (collection) =>
    collection.getFilteredByTags("project").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    })
  );
  eleventyConfig.addCollection("pageSorted", (collection) =>
    collection.getFilteredByTags("page").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    })
  );
  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
