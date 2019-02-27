const puppeteer = require('puppeteer');

const getPdfFilePath = require('./get-pdf-file-path');
const isUrl = require('./is-url');

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

	// this makes sure that relative paths are resolved properly
	await page.goto(`http://localhost:${config.port}`);

	// overwrite the content with what was generated from the markdown
	await page.setContent(html);

	// add all the stylesheets and custom css
	await Promise.all([
		...config.stylesheet.map(async stylesheet =>
			page.addStyleTag(isUrl(stylesheet) ? { url: stylesheet } : { path: stylesheet }),
		),
		page.addStyleTag({ content: config.css }),
	]);

	/**
	 * Wait for network to be idle.
	 *
	 * @todo replace with page.waitForNetworkIdle once exposed
	 * @see https://github.com/GoogleChrome/puppeteer/issues/3083
	 */
	await Promise.all([
		page.waitForNavigation({ waitUntil: 'networkidle0' }),
		page.evaluate(() => history.pushState(null, null, '#')), // eslint-disable-line no-undef
	]);

	if (config.devtools) {
		await new Promise(resolve => page.on('close', resolve));
	} else {
		await page.emulateMedia('screen');
		await page.pdf({ path: pdfFilePath, ...config.pdf_options });
	}

	browser.close();

	return config.devtools ? {} : { filename: pdfFilePath };
};
