import { writeFile as fsWriteFile } from 'fs';
import { promisify } from 'util';
import puppeteer from 'puppeteer';
import { getOutputFilePath } from './get-output-file-path';
import { isHttpUrl } from './is-http-url';
import { Config } from './config';

const writeFile = promisify(fsWriteFile);

/**
 * Create a PDF and write it to disk.
 *
 * @returns a promise that resolves once the file is written
 */
export const writeOutput = async (mdFilePath: string, html: string, config: Config): Promise<{ filename?: string }> => {
	const browser = await puppeteer.launch({ devtools: config.devtools, ...config.launch_options });

	const page = await browser.newPage();

	// make sure that relative paths are resolved properly
	await page.goto(`http://localhost:${config.port}`);

	// overwrite the content with what was generated from the markdown
	await page.setContent(html);

	// add all the stylesheets and custom css
	await Promise.all([
		...config.stylesheet.map(async stylesheet =>
			page.addStyleTag(isHttpUrl(stylesheet) ? { url: stylesheet } : { path: stylesheet }),
		),
		config.css ? page.addStyleTag({ content: config.css }) : undefined,
	]);

	/**
	 * Wait for network to be idle.
	 *
	 * @todo replace with page.waitForNetworkIdle once exposed
	 * @see https://github.com/GoogleChrome/puppeteer/issues/3083
	 */
	await Promise.all([
		page.waitForNavigation({ waitUntil: 'networkidle0' }),
		page.evaluate(() => history.pushState(undefined, '', '#')),
	]);

	/**
	 * @todo should it be `getOutputFilePath(config.dest || mdFilePath, config)`?
	 */
	const outputFilePath = config.dest || getOutputFilePath(mdFilePath, config);

	if (config.devtools) {
		await new Promise(resolve => page.on('close', resolve));
	} else if (config.as_html) {
		const content = await page.content();
		await writeFile(outputFilePath, content);
	} else {
		/**
		 * @todo replace with `await page.emulateMediaType('screen');` once @types/puppeteer is
		 */
		await page.emulateMedia('screen');
		await page.pdf({ path: outputFilePath, ...config.pdf_options });
	}

	await browser.close();

	return config.devtools ? {} : { filename: outputFilePath };
};
