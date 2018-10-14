const path = require('path');

/**
 * In config keys, dashes of cli flag names are replaced with underscores.
 */
module.exports = {
	/**
	 * List of css files to use for styling.
	 */
	stylesheet: [path.resolve(__dirname, '..', 'markdown.css')],

	/**
	 * Custom css styles.
	 */
	css: '',

	/**
	 * List of classes for the body tag.
	 */
	body_class: [],

	/**
	 * Highlight.js stylesheet to use (without the .css extension).
	 *
	 * @see https://github.com/isagalaev/highlight.js/tree/master/src/styles
	 */
	highlight_style: 'github',

	/**
	 * Options for the Marked parser.
	 *
	 * @see https://marked.js.org/#/USING_ADVANCED.md
	 */
	marked_options: {},

	/**
	 * PDF options for Puppeteer.
	 *
	 * @see https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions
	 */
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

	/**
	 * Markdown file encoding.
	 */
	md_file_encoding: 'utf-8',

	/**
	 * CSS stylesheet encoding.
	 */
	stylesheet_encoding: 'utf-8',

	/**
	 * If true, open chromium with devtools instead of saving the pdf. This is
	 * meant for development only, to inspect the rendered HTML.
	 */
	devtools: false,
};
