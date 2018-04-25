const html2pdf = require('html-pdf');
const config = require('./config');
const getPdfFilePath = require('./get-pdf-file-path');
const getAssetBasePath = require('./get-asset-base-path');

module.exports = (mdFilePath, outputPath, html, optionsFromCliArgs, callback) => {
	const pdfFilePath = outputPath || getPdfFilePath(mdFilePath);
	const assetBasePath = getAssetBasePath(mdFilePath);

	const options = {
		base: `file://${assetBasePath}/`,
		...config.htmlPdfOptions,
		...optionsFromCliArgs,
	};

	html2pdf.create(html, options).toFile(pdfFilePath, callback);
};
