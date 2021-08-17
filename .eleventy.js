const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/sass/");

    // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

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
        // passthroughFileCopy: true,
        dir: {
            input: "src",
            output: "public",
        },
        // Let Eleventy transform HTML files as nunjucks
        // So that we can use .html instead of .njk
        // htmlTemplateEngine: "njk",
    };
};