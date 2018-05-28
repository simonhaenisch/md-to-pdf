const { parse, resolve } = require('path');

/**
 * Get the directory that a file is in.
 * @param {String} filePath Path to the source markdown file
 * @returns the assets base path, which is the directory of the source markdown
 * file.
 */
module.exports.getDir = filePath => resolve(parse(filePath).dir);
