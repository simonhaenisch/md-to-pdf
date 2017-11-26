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

	// name of the css file to use for styling
	cssFileName: 'markdown.css',

	// encoding for css and markdown files
	markdownFileEncoding: 'utf-8',
	cssFileEncoding: 'utf-8',
};
