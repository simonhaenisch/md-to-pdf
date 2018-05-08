const { parse, join } = require('path');

/**
 * Derives the PDF output file path from the source markdown file.
 * @param {String} mdFilePath Path to the source markdown file
 */
module.exports = mdFilePath => join(parse(mdFilePath).dir, parse(mdFilePath).name + '.pdf');
