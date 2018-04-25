module.exports = {
	// see https://github.com/marcbachmann/node-html-pdf#options
	pageOptions: {
		format: 'A4',
		border: {
			top: '30mm',
			right: '40mm',
			bottom: '30mm',
			left: '20mm',
		},
	},

	// see https://marked.js.org/#/USING_ADVANCED.md
	markedOptions: {
		gfm: true,
		tables: true,
	},

	// see https://github.com/isagalaev/highlight.js/tree/master/src/styles
	// (without .css)
	highlightStyle: 'github',

	// name of the css file to use for styling
	stylesheet: 'markdown.css',

	// default encoding for css and markdown files
	defaultEncoding: 'utf-8',
};
