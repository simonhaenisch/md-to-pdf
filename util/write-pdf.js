const puppeteer = require('puppeteer');
const serve = require('serve');
const getPort = require('get-port');
const getPdfFilePath = require('./get-pdf-file-path');
const waitForLocalhost = require('./wait-for-localhost');
const { getDir } = require('./helpers');

/**
 * Create a PDF and write it to disk.
 * @param {String} mdFilePath Path to the source markdown file
 * @param {String} [outputPath] Path that the PDF will be written to
 * @param {String} html HTML document as a string
 * @param {Object} config Configuration object
 * @param {String[]} config.stylesheet list of stylesheets (urls or paths)
 * @param {String} config.css string with CSS rules
 * @param {Object} config.pdf_options Options for puppeteer
 * @param {Booleab} config.devtools Show the Devtools instead of saving the PDF
 * @returns a promise that resolves once the file is written and contains the
 * pdf's filename
 */
module.exports = async (mdFilePath, outputPath, html, config) => {
	const pdfFilePath = outputPath || getPdfFilePath(mdFilePath);
	const assetsBasePath = getDir(mdFilePath);
	const port = await getPort();

	const server = serve(assetsBasePath, { port, local: true, clipless: true, silent: true });

	await waitForLocalhost(port);

	const browser = await puppeteer.launch({ devtools: config.devtools });

	const page = await browser.newPage();

	// track requests using array
	const requests = [];
	page.on('request', () => requests.push(null));
	page.on('requestfinished', () => requests.pop());
	page.on('requestfailed', () => requests.pop());

	await page.goto(`http://localhost:${port}`, { waitUntil: 'networkidle0' });
	await page.setContent(html);

	await config.stylesheet.map(async stylesheet => {
		await page.addStyleTag(stylesheet.startsWith('http') ? { url: stylesheet } : { path: stylesheet });
	});

	await page.addStyleTag({ content: config.css });

	// wait until requests array is empty (wish puppeteer could handle that)
	await new Promise(resolve => {
		const waitUntilEmpty = async array => (array.length > 0 ? setTimeout(() => waitUntilEmpty(array), 100) : resolve());
		waitUntilEmpty(requests);
	});

	if (config.devtools) {
		await new Promise(resolve => page.on('close', resolve));
	} else {
		await page.pdf({ path: pdfFilePath, printBackground: true, ...config.pdf_options });
	}

	browser.close();
	server.stop();

	return config.devtools ? {} : { filename: pdfFilePath };
};
