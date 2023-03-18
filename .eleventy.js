const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const sass = require("sass");
const fs = require("fs");

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true,
};

const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

module.exports = function (eleventyConfig) {
  // Return your Object options:
  eleventyConfig.addPassthroughCopy({ "./theme/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "./content/img": "img" });
  eleventyConfig.addPassthroughCopy({ "./theme/assets/js": "assets/js" });
  eleventyConfig.watchIgnores.add("theme/assets/css/main.css");
  eleventyConfig.addWatchTarget("./content/");
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
  eleventyConfig.addPairedShortcode("bigText", function (content) {
    return '<section class="big-text">' + content + "</section>";
  });

  eleventyConfig.on("eleventy.before", () => {
    let compiled = sass.compile("theme/assets/css/main.scss", {
      style: "compressed",
    });
    fs.writeFileSync("theme/assets/css/main.css", compiled.css);
  });

  return {
    passthroughFileCopy: true,
    dir: {
      input: "content/pages",
      includes: "../../theme/_includes",
      data: "../data",

      output: "dist",
    },
  };
};
