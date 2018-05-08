const marked = require('./get-marked-with-highlighter');

/**
 * Generates a HTML document from a markdown string and returns it as a string.
 * @param {string} md Markdown content
 * @param {string[]} headTags List of tags to add into the <head/>
 * @param {Object} config Configuration object
 * @param {String[]} config.body_class List of classes to append to the body tag
 * @param {Object} config.marked_options Options for marked
 */
module.exports = (md, headTags, config) => `<!DOCTYPE html>
<html><head>
${headTags.join('\n')}
</head><body class="${config.body_class.join(' ')}">
${marked(config)(md)}
</body></html>
`;
