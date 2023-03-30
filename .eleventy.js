const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const sass = require("sass");
const fs = require("fs");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const lazyImagesPlugin = require("eleventy-plugin-lazyimages");

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true,
};

const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

module.exports = function (eleventyConfig) {
  // add eleventy navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(lazyImagesPlugin, {});

  // Return your Object options:
  eleventyConfig.addPassthroughCopy({ "./theme/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "./img": "img" });
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

  // add custom filters for debugging - logs the object's keys to the console.
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
  eleventyConfig.addNunjucksFilter("getProjectPagesByParent", (arg1, arg2) => {
    let siblings = arg1.filter((item) => {
      // console.log(item.data.eleventyNavigation.parent);
      // console.log(arg2);
      return item.data.eleventyNavigation.parent === arg2;
    });
    // console.log(Object.keys(siblings[0]));
    return siblings;
  });
  //arg2 is the EleventyNavigation object of the page requesting the siblings

  eleventyConfig.addNunjucksFilter("getSiblingPages", (arg1, arg2) => {
    let siblings = arg1.filter((item) => {
      return item.data.eleventyNavigation.parent === arg2.parent;
    });
    if (siblings.length == 1) {
      return ["", ""];
    }

    const curPageIndex = siblings.findIndex((page) => {
      return page.data.eleventyNavigation.key == arg2.key;
    });
    let nextPageIndex = curPageIndex + 1;
    let prevPageIndex = curPageIndex - 1;
    if (nextPageIndex >= siblings.length) {
      nextPageIndex = 0;
    }
    if (prevPageIndex < 0) {
      prevPageIndex = siblings.length - 1;
    }

    let navSiblings = [siblings[prevPageIndex], siblings[nextPageIndex]];
    navSiblings[0].labelText = `← see previous project`;

    navSiblings[1].labelText = "see next project →";

    if (curPageIndex == 0) {
      navSiblings[0] = "";
    }
    if (curPageIndex == siblings.length - 1) {
      navSiblings[1] = "";
    }

    return navSiblings;
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
