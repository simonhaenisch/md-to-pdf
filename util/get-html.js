const { join } = require('path');
const marked = require('./get-marked-with-highlighter');

module.exports = (md, css, highlightStylePath, optionsFromCliArgs) => `<!DOCTYPE html>
<html><head>
<link rel="stylesheet" href="${highlightStylePath}">
<style>
${css}
</style>
</head><body>
${marked(optionsFromCliArgs)(md)}
</body></html>
`;
