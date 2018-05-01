const marked = require('./get-marked-with-highlighter');

module.exports = (md, css, highlightStylePath, config, optionsFromCliArgs) => `<!DOCTYPE html>
<html><head>
<link rel="stylesheet" href="${highlightStylePath}">
<style>
${css}
</style>
</head><body>
${marked(config)(md)}
</body></html>
`;
