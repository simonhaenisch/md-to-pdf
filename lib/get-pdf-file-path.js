const { parse, join } = require('path');

/**
 * Derives the PDF output file path from the source markdown file.
 *
 * @param {string} mdFilePath path to the source markdown file
 *
 * @returns path to the PDF output file
 */
module.exports = mdFilePath => join(parse(mdFilePath).dir, parse(mdFilePath).name + '.pdf');
