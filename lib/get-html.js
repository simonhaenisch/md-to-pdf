const getMarked = require('./get-marked-with-highlighter');

/**
 * Generates a HTML document from a markdown string and returns it as a string.
 *
 * @param {string} md markdown content
 * @param {Object} config configuration object
 * @param {string[]} config.body_class list of classes to append to the body tag
 * @param {Object} config.marked_options options for Marked
 *
 * @returns string containing HTML document with transformed markdown
 */
module.exports = (md, config) => `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
</head>
<body class="${config.body_class.join(' ')}">
${getMarked(config.marked_options)(md)}
</body></html>
`;
