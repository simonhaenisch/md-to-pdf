const { sep } = require('path');
const html2pdf = require('html-pdf');
const getPdfFilePath = require('./get-pdf-file-path');
const getAssetsBasePath = require('./get-assets-base-path');

/**
 * Create PDF and write it to disk. Returns a promise that resolves once the
 * file is written.
 * @param {String} mdFilePath Path to the source markdown file
 * @param {String} outputPath Path that the PDF will be written to
 * @param {String} html HTML document as a string
 * @param {Object} config Configuration object
 * @param {Object} config.html_pdf_options Options for html-pdf
 */
module.exports = (mdFilePath, outputPath, html, config) => {
	const pdfFilePath = outputPath || getPdfFilePath(mdFilePath);
	const assetsBasePath = getAssetsBasePath(mdFilePath);

	const options = { base: `file://${assetsBasePath}${sep}`, ...config.html_pdf_options };

	return new Promise((resolve, reject) => {
		html2pdf.create(html, options).toFile(pdfFilePath, (err, res) => {
			err ? reject(err) : resolve(res);
		});
	});
};
