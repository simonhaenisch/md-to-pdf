const puppeteer = require('puppeteer');
const getPdfFilePath = require('./get-pdf-file-path');

/**
 * Create a PDF and write it to disk.
 *
 * @param {string} mdFilePath path to the source markdown file
 * @param {string} html HTML document as a string
 * @param {Object} config configuration object
 * @param {string} [config.dest] path to write the output to
 * @param {number} config.port port that the server runs on
 * @param {string[]} config.stylesheet list of stylesheets (urls or paths)
 * @param {string} config.css string with CSS rules
 * @param {Object} config.pdf_options PDF options for Puppeteer
 * @param {boolean} config.devtools show the Devtools instead of saving the PDF
 * @param {puppeteer.LaunchOptions} config.launch_options browser launch options
 *
 * @returns a promise that resolves once the file is written that contains the
 * pdf's filename
 */
module.exports = async (mdFilePath, html, config) => {
	const pdfFilePath = config.dest || getPdfFilePath(mdFilePath);

	const browser = await puppeteer.launch({ devtools: config.devtools, ...config.launch_options });

	const page = await browser.newPage();

	// track requests using array
	const requests = [];
	page.on('request', () => requests.push(null));
	page.on('requestfinished', () => requests.pop());
	page.on('requestfailed', () => requests.pop());

	await page.goto(`http://localhost:${config.port}`, { waitUntil: 'networkidle0' });
	await page.setContent(html);

	await config.stylesheet.map(async stylesheet => {
		await page.addStyleTag(stylesheet.startsWith('http') ? { url: stylesheet } : { path: stylesheet });
	});

	await page.addStyleTag({ content: config.css });

	// wait until requests array is empty (wish puppeteer could handle that)
	await new Promise(resolve => {
		const waitUntilEmpty = array => (array.length > 0 ? setTimeout(() => waitUntilEmpty(array), 100) : resolve());
		waitUntilEmpty(requests);
	});

	if (config.devtools) {
		await new Promise(resolve => page.on('close', resolve));
	} else {
		await page.emulateMedia('screen');
		await page.pdf({ path: pdfFilePath, ...config.pdf_options });
	}

	browser.close();

	return config.devtools ? {} : { filename: pdfFilePath };
};
