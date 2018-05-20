const { parse, resolve } = require('path');

/**
 * Get the directory that a file is in.
 * @param {String} filePath Path to the source markdown file
 * @returns the assets base path, which is the directory of the source markdown
 * file.
 */
module.exports.getDir = filePath => resolve(parse(filePath).dir);

/**
 * Wrap a CSS rule string in a <style/> tag.
 * @param {string} css String containing CSS rules
 * @returns the css string wrapped in a <style/> tag
 */
module.exports.createStyleTag = css => `<style>${css}</style>`;

/**
 * Get a <link/> tag for the given stylesheet path/url.
 * @param {string} stylesheet Path to stylesheet
 * @returns a <link/> tag for the given stylesheet
 */
module.exports.createLinkTag = stylesheet => `<link rel="stylesheet" href="${stylesheet}">`;
