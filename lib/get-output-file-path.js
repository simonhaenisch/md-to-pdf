const { parse, join } = require('path');

/**
 * Derives the output file path from the source markdown file.
 *
 * @param {string} mdFilePath path to the source markdown file
 * @param {Object} config configuration object
 * @param {boolean} config.as_html whether to save the output as HTML instead
 *
 * @returns path to the output file
 */
module.exports = (mdFilePath, config) =>
	join(parse(mdFilePath).dir, parse(mdFilePath).name + (config.as_html ? '.html' : '.pdf'));
