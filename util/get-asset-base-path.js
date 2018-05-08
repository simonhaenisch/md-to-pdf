const { parse, resolve } = require('path');

/**
 * Returns the assets base path, which is the directory of the source markdown
 * file.
 * @param {String} mdFilePath Path to the source markdown file
 */
module.exports = mdFilePath => resolve(parse(mdFilePath).dir);
