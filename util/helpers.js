/**
 * Returns the css rules wrapped in a <style/> tag.
 * @param {string} css String containing CSS rules
 */
module.exports.createStyleTag = css => `<style>${css}</style>`;

/**
 * Returns a <link/> tag for the given stylesheet.
 * @param {string} stylesheet Path to stylesheet
 */
module.exports.createLinkTag = stylesheet => `<link rel="stylesheet" href="${stylesheet}">`;
