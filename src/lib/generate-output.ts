import puppeteer from 'puppeteer';
import { Config, HtmlConfig, PdfConfig } from './config';
import { isHttpUrl } from './is-http-url';

export type Output = PdfOutput | HtmlOutput;

export interface PdfOutput extends BasicOutput {
	content: Buffer;
}

export interface HtmlOutput extends BasicOutput {
	content: string;
}

interface BasicOutput {
	filename: string | undefined;
}

/**
 * Store a single browser instance reference so that we can re-use it.
 */
let browserInstance: Promise<puppeteer.Browser> | undefined;

/**
 * Close the browser instance.
 */
export const closeBrowser = async () => {
	const browser = await browserInstance;
	if (browser) await browser.close();
};

/**
 * Generate the output (either PDF or HTML).
 */
export async function generateOutput(html: string, relativePath: string, config: PdfConfig): Promise<PdfOutput>;
export async function generateOutput(html: string, relativePath: string, config: HtmlConfig): Promise<HtmlOutput>;
export async function generateOutput(html: string, relativePath: string, config: Config): Promise<Output>;
export async function generateOutput(html: string, relativePath: string, config: Config): Promise<Output> {
	if (browserInstance === undefined) {
		browserInstance = puppeteer.launch({ devtools: config.devtools, ...config.launch_options });
	}

	const browser = await browserInstance;
	const page = await browser.newPage();

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	await page.goto(`http://localhost:${config.port!}${relativePath}`); // make sure relative paths work as expected
	await page.setContent(html); // overwrite the page content with what was generated from the markdown

	for (const stylesheet of config.stylesheet) {
		await page.addStyleTag(isHttpUrl(stylesheet) ? { url: stylesheet } : { path: stylesheet });
	}

	if (config.css) {
		await page.addStyleTag({ content: config.css });
	}

	for (const scriptTagOptions of config.script) {
		await page.addScriptTag(scriptTagOptions);
	}

	/**
	 * Trick to wait for network to be idle.
	 *
	 * @todo replace with page.waitForNetworkIdle once exposed
	 * @see https://github.com/GoogleChrome/puppeteer/issues/3083
	 */
	await Promise.all([
		page.waitForNavigation({ waitUntil: 'networkidle0' }),
		page.evaluate(() => history.pushState(undefined, '', '#')) /* eslint no-undef: off */,
	]);

	let outputFileContent: string | Buffer = '';

	if (config.devtools) {
		await new Promise((resolve) => page.on('close', resolve));
	} else if (config.as_html) {
		outputFileContent = await page.content();
	} else {
		await page.emulateMediaType(config.page_media_type);
		outputFileContent = await page.pdf(config.pdf_options);
	}

	await page.close();

	return config.devtools ? (undefined as any) : { filename: config.dest, content: outputFileContent };
}
