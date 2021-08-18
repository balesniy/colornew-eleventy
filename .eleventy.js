const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const svgSprite = require("eleventy-plugin-svg-sprite");
const Image = require("@11ty/eleventy-img");
const path = require('path');

async function imageShortcode(src, alt = '', sizes = "(min-width: 1024px) 100vw, 50vw") {
    console.log(`Generating image(s) from:  ${src}`)
    const metadata = await Image(src, {
        widths: [300, 600],
        formats: ['webp', 'jpeg'],
        urlPath: "/img/",
        outputDir: "./public/img/",
        filenameFormat(id, src, width, format, options) {
            const extension = path.extname(src);
            const name = path.basename(src, extension);

            return `${name}-${width}w.${format}`;
        }
    });

    const imageAttributes = {
        alt,
        sizes,
        loading: "lazy",
        decoding: "async",
    };
    return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/sass/");

    // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

    eleventyConfig.addPlugin(pluginRss);

    eleventyConfig.addPlugin(svgSprite, {
        path: "./src/img/svg", // relative path to SVG directory
        // (MUST be defined when initialising plugin)
    });

    eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

    // Merge data instead of overriding
    // https://www.11ty.dev/docs/data-deep-merge/
    eleventyConfig.setDataDeepMerge(true);

    // Configuration API: use eleventyConfig.addLayoutAlias(from, to) to add
    // layout aliases! Say you have a bunch of existing content using
    // layout: post. If you don’t want to rewrite all of those values, just map
    // post to a new file like this:
    // eleventyConfig.addLayoutAlias("post", "layouts/my_new_post_layout.njk");


    eleventyConfig.addPassthroughCopy("./src/fonts");
    eleventyConfig.addPassthroughCopy("./src/img");
    eleventyConfig.addPassthroughCopy("./src/js");
    eleventyConfig.addPassthroughCopy("./src/favicon.png");
    eleventyConfig.addPassthroughCopy("./src/admin");

    eleventyConfig.addFilter("randomItem", (arr) => {
        arr.sort(() => {
            return 0.5 - Math.random();
        });
        return arr.slice(0, 1);
    });

    return {
        dir: {
            input: "src",
            output: "public",
        },
        // Let Eleventy transform HTML files as nunjucks
        // So that we can use .html instead of .njk
        // htmlTemplateEngine: "njk",
    };
};