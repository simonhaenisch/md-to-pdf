const path = require('path');

// In config keys, dashes of cli flag names are replaced with underscores.
module.exports = {
	// list of css files to use for styling
	stylesheet: [path.resolve(__dirname, '..', 'markdown.css')],

	// custom css styles
	css: '',

	// list of classes for the body tag
	body_class: [],

	// see https://github.com/isagalaev/highlight.js/tree/master/src/styles
	// (without .css)
	highlight_style: 'github',

	// see https://marked.js.org/#/USING_ADVANCED.md
	marked_options: {
		gfm: true,
		tables: true,
	},

	// see https://github.com/marcbachmann/node-html-pdf#options
	html_pdf_options: {
		format: 'A4',
		border: {
			top: '30mm',
			right: '40mm',
			bottom: '30mm',
			left: '20mm',
		},
	},

	// encoding
	md_file_encoding: 'utf-8',
	stylesheet_encoding: 'utf-8',
};
