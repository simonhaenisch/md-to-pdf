const getMarked = require('./get-marked-with-highlighter');

/**
 * Generates a HTML document from a markdown string and returns it as a string.
 *
 * @param {string} md markdown content
 * @param {Object} config configuration object
 * @param {string[]} config.body_class list of classes to append to the body tag
 * @param {Object} config.marked_options options for Marked
 * @param {Set<string>} config.stylesheet stylesheet links to append to the head tag
 * @param {string} config.css css string to append to the style tag
 *
 * @returns string containing HTML document with transformed markdown
 */
module.exports = (md, config) => `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	${config.stylesheet && config.stylesheet.map(styles => `<link rel="stylesheet" href="${styles}">`).join('')}
</head>
${config.css && `<style>${config.css}</style>`}
<body class="${config.body_class.join(' ')}">
${getMarked(config.marked_options)(md)}
</body></html>
`;
