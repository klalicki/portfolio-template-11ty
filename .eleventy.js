const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true,
};

const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

module.exports = function (eleventyConfig) {
  // Return your Object options:
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/img");

  // adds custom collections for projects and pages which are sorted by an 'order' parameter in front matter.
  eleventyConfig.addCollection("projectSorted", (collection) =>
    collection.getFilteredByTags("project").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    })
  );
  /* Sorting the pages by the order parameter in the front matter. */
  eleventyConfig.addCollection("pageSorted", (collection) =>
    collection.getFilteredByTags("page").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    })
  );
  eleventyConfig.addCollection("portfolioSorted", (collection) =>
    collection.getFilteredByTags("portfolio").sort((a, b) => {
      return (a.data.order || 0) - (b.data.order || 0);
    })
  );
  eleventyConfig.setLibrary("md", markdownLib);
  return {
    passthroughFileCopy: true,
    dir: {
      data: "data",
      input: "src",
      output: "dist",
    },
  };
};
