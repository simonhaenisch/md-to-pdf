const { parse, resolve } = require('path');

/**
 * Get the asset base path for html-pdf.
 * @param {String} mdFilePath Path to the source markdown file
 * @returns the assets base path, which is the directory of the source markdown
 * file.
 */
module.exports = mdFilePath => resolve(parse(mdFilePath).dir);
