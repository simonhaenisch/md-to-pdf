import { WatchOptions } from 'chokidar';
import { MarkedOptions } from 'marked';
import { resolve } from 'path';
import { FrameAddScriptTagOptions, launch, PDFOptions } from 'puppeteer';

export const defaultConfig: Config = {
	basedir: process.cwd(),
	stylesheet: [resolve(__dirname, '..', '..', 'markdown.css')],
	script: [],
	css: '',
	document_title: '',
	body_class: [],
	page_media_type: 'screen',
	highlight_style: 'github',
	marked_options: {},
	pdf_options: {
		printBackground: true,
		format: 'a4',
		margin: {
			top: '30mm',
			right: '40mm',
			bottom: '30mm',
			left: '20mm',
		},
	},
	launch_options: {},
	md_file_encoding: 'utf-8',
	stylesheet_encoding: 'utf-8',
	as_html: false,
	devtools: false,
};

/**
 * In config keys, dashes of cli flag names are replaced with underscores.
 */
export type Config = PdfConfig | HtmlConfig;

export interface PdfConfig extends BasicConfig {
	/**
	 * If true, generate HTML output instead of PDF output. Default: `false`.
	 */
	as_html?: false;
}

export interface HtmlConfig extends BasicConfig {
	/**
	 * If true, generate HTML output instead of PDF output. Default: `false`.
	 */
	as_html: true;
}

interface BasicConfig {
	/**
	 * Base directory to be served by the file server.
	 */
	basedir: string;

	/**
	 * Optional destination path for the output file (including the extension).
	 */
	dest?: string;

	/**
	 * List of css files to use for styling.
	 *
	 * @todo change to `FrameAddStyleTagOptions` (will be a breaking change)
	 */
	stylesheet: string[];

	/**
	 * Custom css styles.
	 */
	css: string;

	/**
	 * List of scripts to load into the page.
	 *
	 * @see https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#pageaddscripttagoptions
	 */
	script: FrameAddScriptTagOptions[];

	/**
	 * Name of the HTML Document.
	 */
	document_title: string;

	/**
	 * List of classes for the body tag.
	 */
	body_class: string[];

	/**
	 * Media type to emulate the page with.
	 */
	page_media_type: 'screen' | 'print';

	/**
	 * Highlight.js stylesheet to use (without the .css extension).
	 *
	 * @see https://github.com/isagalaev/highlight.js/tree/master/src/styles
	 */
	highlight_style: string;

	/**
	 * Options for the Marked parser.
	 *
	 * @see https://marked.js.org/#/USING_ADVANCED.md
	 */
	marked_options: MarkedOptions;

	/**
	 * PDF options for Puppeteer.
	 *
	 * @see https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
	 */
	pdf_options: PDFOptions;

	/**
	 * Launch options for Puppeteer.
	 *
	 * @see https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
	 */
	launch_options: PuppeteerLaunchOptions;

	/**
	 * Markdown file encoding. Default: `utf-8`.
	 */
	md_file_encoding: string;

	/**
	 * CSS stylesheet encoding. Default: `utf-8`.
	 */
	stylesheet_encoding: string;

	/**
	 * If true, open chromium with devtools instead of saving the pdf. This is
	 * meant for development only, to inspect the rendered HTML.
	 */
	devtools: boolean;

	/**
	 * Port to run the local server on.
	 */
	port?: number;

	/**
	 * Options to pass to Chokidar's `watch` call.
	 *
	 * This is specifically useful when running into issues when editor plugins trigger additional saves after the initial save.
	 */
	watch_options?: WatchOptions;
}

export type PuppeteerLaunchOptions = Parameters<typeof launch>[0];
