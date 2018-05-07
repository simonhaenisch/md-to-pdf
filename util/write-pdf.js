const html2pdf = require('html-pdf');
const getPdfFilePath = require('./get-pdf-file-path');
const getAssetBasePath = require('./get-asset-base-path');

module.exports = (mdFilePath, outputPath, html, config) => {
	const pdfFilePath = outputPath || getPdfFilePath(mdFilePath);
	const assetBasePath = getAssetBasePath(mdFilePath);

	const options = { base: `file://${assetBasePath}/`, ...config.html_pdf_options };

	return new Promise((resolve, reject) => {
		html2pdf.create(html, options).toFile(pdfFilePath, (err, res) => {
			err ? reject(err) : resolve(res);
		});
	});
};
