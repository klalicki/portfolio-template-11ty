const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const sass = require("sass");
const fs = require("fs");

const markdownSections = () => {};

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
    return (
      '</div><section class="big-text">' +
      content +
      '</section><div class="col-standard-width"'
    );
  });

  eleventyConfig.on("eleventy.before", () => {
    try {
      let compiled = sass.compile("theme/assets/css/main.scss", {});
      fs.writeFileSync("theme/assets/css/main.css", compiled.css);
      console.log("successfully built and wrote SASS!");
    } catch (err) {
      console.log("error compiling SASS!");
      console.log(err);
    }
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
