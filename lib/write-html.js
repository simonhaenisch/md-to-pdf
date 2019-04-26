const getFilePath = require('./get-file-path');
const writeFile = require('fs').writeFile;

module.exports = (mdFile, html, config) => {
	const htmlFilePath = config.dest || getFilePath(mdFile, '.html');

	writeFile(htmlFilePath, html, err => {
		if (err) throw new Error(`Failed to write HTML`);
	});
	return { filename: htmlFilePath };
};
