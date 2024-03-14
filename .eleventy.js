const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
const sass = require("sass");
const fs = require("fs");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const urlBase = process.env.BASE_URL || "";
const path = require("path");

const markdownItOptions = {
  html: true,
  breaks: true,
  linkify: true,
};
console.log("version ");
const markdownLib = markdownIt(markdownItOptions).use(markdownItAttrs);

module.exports = async function (eleventyConfig) {
  const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
  const { eleventyImageTransformPlugin } = await import("@11ty/eleventy-img");
  // add eleventy navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPlugin(embedYouTube);

  let p = {};
  console.log("environment is " + process.env.NODE_ENV);
  if (process.env.NODE_ENV === "build") {
    console.log("running in production");
    console.log("URL base is " + urlBase);
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin, { baseHref: urlBase });
    // this should be set
    p = { pathPrefix: urlBase };
  }

  // Return your Object options:
  eleventyConfig.addPassthroughCopy({ "theme/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/content/img": "img" });

  eleventyConfig.addPassthroughCopy({
    "src/css/custom.css": "assets/css/custom.css",
  });

  eleventyConfig.watchIgnores.add("theme/assets/css/main.css");
  eleventyConfig.addWatchTarget("./content/");
  eleventyConfig.addWatchTarget("theme/assets/main.scss");

  eleventyConfig.addWatchTarget("src/css/");
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
    navSiblings[0].labelText = `← previous project`;

    navSiblings[1].labelText = "next project →";

    if (curPageIndex == 0) {
      navSiblings[0] = "";
    }
    if (curPageIndex == siblings.length - 1) {
      navSiblings[1] = "";
    }

    return navSiblings;
  });
  eleventyConfig;
  eleventyConfig.addPlugin(eleventyImageTransformPlugin, {
    extensions: "html",
    formats: ["webp", "jpeg"], // I'm generating `avif` files, the docs include just `webp` and `jpeg`
    widths: [480, 960, 1440], // I moved the explicit widths over from my old shortcode
    defaultAttributes: {
      loading: "lazy",
      decoding: "async",
      sizes: "90vw", // I set a default `sizes` attribute here — the plugin errored out without it and I didn't want to set it per image
    },
    outputDir: "./dist/img/",
    urlPath: "",
    filenameFormat: (id, src, width, format) => {
      const { name } = path.parse(src);
      return `${name}-${width}w.${format}`;
    },
  });

  eleventyConfig.on("eleventy.before", () => {
    try {
      const warningMessage =
        "/* WARNING: This file is overwritten at every build. Please do not try editing it. \n If you are trying to customize styling, please edit main.scss instead:\n main.scss is automatically compiled into this file at build time. */ \n";
      let compiled = sass.compile("theme/assets/css/main.scss", {});
      fs.writeFileSync(
        "theme/assets/css/main.css",
        warningMessage + compiled.css
      );
      console.log("successfully built and wrote SASS!");
    } catch (err) {
      console.log("error compiling SASS!");
      console.log(err);
    }
  });

  // image transform plugin

  return {
    ...p,
    passthroughFileCopy: true,
    dir: {
      input: "src/content",
      includes: "../../theme/_includes",
      data: "../data",

      output: "dist",
    },
  };
};
