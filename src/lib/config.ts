import { MarkedOptions } from 'marked';
import { resolve } from 'path';
import { LaunchOptions, PDFOptions } from 'puppeteer';

export const defaultConfig: Config = {
	basedir: process.cwd(),
	stylesheet: [resolve(__dirname, '..', '..', 'markdown.css')],
	css: '',
	body_class: [],
	page_media_type: 'screen',
	highlight_style: 'github',
	marked_options: {},
	pdf_options: {
		printBackground: true,
		format: 'A4',
		margin: {
			top: '30mm',
			right: '40mm',
			bottom: '30mm',
			left: '20mm',
		},
	},
	toc_heading: 'Contents',
	toc_skip: 0,
	toc_depth: 3,
	launch_options: {},
	md_file_encoding: 'utf-8',
	stylesheet_encoding: 'utf-8',
	as_html: false,
	devtools: false,
};

/**
 * In config keys, dashes of cli flag names are replaced with underscores.
 */
export interface Config {
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
	 */
	stylesheet: string[];

	/**
	 * Custom css styles.
	 */
	css: string;

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
	launch_options: LaunchOptions;

	/**
	 * Markdown file encoding. Default: `utf-8`.
	 */
	md_file_encoding: string;

	/**
	 * CSS stylesheet encoding. Default: `utf-8`.
	 */
	stylesheet_encoding: string;

	/**
	 * If true, generate HTML output instead of PDF output. Default: `false`.
	 */
	as_html: boolean;

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
	 * The text to display on top of the table of content. Defaults to 'Content'
	 */
	toc_heading: string;

	/**
	 * The starting depth from where to include headings inside the table of content. Defaults to 0
	 */
	toc_skip: number;

	/**
	 * The depth of the table of content to generate. Default to 3. This take into account a possible toc_skip.
	 * So if toc_skip = 1 and toc_depth = 3 then the generation will include levels 2, 3 and 4
	 */
	toc_depth: number;
}
