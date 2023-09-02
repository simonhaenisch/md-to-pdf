import { join, posix, sep } from 'path';
import puppeteer, { Browser } from 'puppeteer';
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
let browserPromise: Promise<Browser> | undefined;

/**
 * Close the browser instance.
 */
export const closeBrowser = async () => (await browserPromise)?.close();

/**
 * Generate the output (either PDF or HTML).
 */
export async function generateOutput(
	html: string,
	relativePath: string,
	config: PdfConfig,
	browserRef?: Browser,
): Promise<PdfOutput>;
export async function generateOutput(
	html: string,
	relativePath: string,
	config: HtmlConfig,
	browserRef?: Browser,
): Promise<HtmlOutput>;
export async function generateOutput(
	html: string,
	relativePath: string,
	config: Config,
	browserRef?: Browser,
): Promise<Output>;
export async function generateOutput(
	html: string,
	relativePath: string,
	config: Config,
	browserRef?: Browser,
): Promise<Output> {
	async function getBrowser() {
		if (browserRef) {
			return browserRef;
		}

		if (!browserPromise) {
			browserPromise = puppeteer.launch({ devtools: config.devtools, ...config.launch_options });
		}

		return browserPromise;
	}

	const browser = await getBrowser();

	const page = await browser.newPage();

	const urlPathname = join(relativePath, 'index.html').split(sep).join(posix.sep);

	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	await page.goto(`http://localhost:${config.port!}/${urlPathname}`); // make sure relative paths work as expected
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
