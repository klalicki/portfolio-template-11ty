const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const sass = require("sass");
const fs = require("fs");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true,
};

const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

module.exports = function (eleventyConfig) {
  // add eleventy navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Return your Object options:
  eleventyConfig.addPassthroughCopy({ "./theme/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "./content/img": "img" });
  eleventyConfig.addPassthroughCopy({ "./theme/assets/js": "assets/js" });
  eleventyConfig.watchIgnores.add("theme/assets/css/main.css");
  eleventyConfig.addWatchTarget("./content/");
  // adds custom collections for projects and pages which are sorted by an 'order' parameter in front matter.

  // adds a custom collection that is sorted by the eleventyNavigation order parameter in front matter.
  eleventyConfig.addCollection("sorted", (collection) => {
    return collection.sort((a, b) => {
      return (
        (a.data.eleventyNavigation.order || 0) -
        (b.data.eleventyNavigation.order || 0)
      );
    });
  });

  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.addPairedShortcode("bigText", function (content) {
    return '<section class="big-text custom-width">' + content + "</section>";
  });
  eleventyConfig.addPairedShortcode("carousel", function (content) {
    let rendered = markdownLib.render(content);
    let lines = rendered.split("\n").filter((item) => {
      return item.length > 0;
    });
    console.log(lines);
    let wrappedLines = lines
      .map((line) => {
        return "<div class='carousel-item'>" + line + "</div>";
      })
      .join("\n");
    // console.log(wrappedLines);
    return '<div class="carousel">' + wrappedLines + "</div>";
  });
  eleventyConfig.addNunjucksFilter("logKeys", (arg1) => {
    console.log(Object.keys(arg1));

    // arg1.page.url
    //arg1.url
  });
  eleventyConfig.addNunjucksFilter("logAll", (arg1) => {
    console.log(arg1);

    // arg1.page.url
    //arg1.url
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
