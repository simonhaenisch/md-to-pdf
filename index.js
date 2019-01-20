const getPort = require('get-port');

const defaultConfig = require('./util/config');
const serveDirectory = require('./util/serve-dir');
const { getDir } = require('./util/helpers');
const mdToPdf = require('./util/md-to-pdf');

/**
 * Convert a markdown file to PDF.
 *
 * @param {string} mdFile path to markdown file
 * @param {*} config config object
 *
 * @returns the path that the PDF was written to
 */
module.exports = async (mdFile, config) => {
	const port = await getPort();
	const server = await serveDirectory(getDir(mdFile), port);

	config = { ...defaultConfig, ...config };

	const pdf = await mdToPdf(mdFile, config, port);

	server.close();

	return pdf;
};
