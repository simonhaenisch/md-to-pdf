import { writeFile as fsWriteFile } from 'fs';
import { promisify } from 'util';
import puppeteer from 'puppeteer';
import { getOutputFilePath } from './get-output-file-path';
import { isHttpUrl } from './is-http-url';
import { Config } from './config';

const writeFile = promisify(fsWriteFile);

/**
 * Write the output (either PDF or HTML) to disk.
 *
 * The reason that relative paths are resolved properly is that the base dir is served locally
 */
export const writeOutput = async (
	mdContent: string,
	html: string,
	config: Config,
): Promise<{} | { filename: string; content: string | Buffer }> => {
	const browser = await puppeteer.launch({ devtools: config.devtools, ...config.launch_options });

	const page = await browser.newPage();

	await page.goto(`http://localhost:${config.port}`);
	await page.setContent(html); // overwrite the page content with what was generated from the markdown

	await Promise.all([
		...config.stylesheet.map(
			async stylesheet => page.addStyleTag(isHttpUrl(stylesheet) ? { url: stylesheet } : { path: stylesheet }), // add each stylesheet
		),
		config.css ? page.addStyleTag({ content: config.css }) : undefined, // add custom css
	]);

	/**
	 * Trick to wait for network to be idle.
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
	const outputFilePath = config.dest || getOutputFilePath(mdContent, config);

	let outputFileContent: string | Buffer = '';

	if (config.devtools) {
		await new Promise(resolve => page.on('close', resolve));
	} else if (config.as_html) {
		outputFileContent = await page.content();
		await writeFile(outputFilePath, outputFileContent);
	} else {
		await page.emulateMediaType('screen');
		outputFileContent = await page.pdf(config.pdf_options);

		await writeFile(outputFilePath, outputFileContent);
	}

	await browser.close();

	return config.devtools ? {} : { filename: outputFilePath, content: outputFileContent };
};
