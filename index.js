#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const html2pdf = require('html-pdf');
const iconv = require('iconv-lite');
const config = require('./config');

// --
// Process CLI Arguments

const mdFile = process.argv[2];
const outFile = process.argv[3];

// make sure that a markdown file was specified
if (mdFile === undefined) {
	console.error('Error: no markdown file specified.');
	process.exit(1);
}

// check if first command line parameter is actually a call for help
if (['-h', '--h', '/h', '?', '/?'].indexOf(mdFile.toLowerCase()) === 0) {
	console.log(`
usage: md-to-pdf path/to/file.md [path/to/output.pdf]

	creates a PDF file from the specified markdown file. If the output path is
	omitted, it will derive the pdf name from the markdown file's name and save it
	into the same directory that contains the markdown file.
	`);

	process.exit();
}

// --
// Generate HTML from Markdown

// get content of markdown and css file as string
let cssFile = path.join(__dirname, config.cssFileName);
const [markdownString, cssString] = [
	[mdFile, config.markdownFileEncoding],
	[cssFile, config.cssFileEncoding],
].map(
	([file, encoding]) =>
		/utf-?8/i.test(encoding)
			? fs.readFileSync(file, encoding)
			: iconv.decode(fs.readFileSync(file), encoding),
);

// combine everything into one html string
const htmlString = `<!DOCTYPE html>
<html><head><style>
${cssString}
</style></head><body>
${marked(markdownString)}
</body></html>
`;

// --
// Create PDF from HTML

// parse markdown file path
const parsedMdFilePath = path.parse(mdFile);

// get or create pdf file name
const pdfFileName =
	outFile || path.join(parsedMdFilePath.dir, `${parsedMdFilePath.name}.pdf`);

// get base path to look for assets
// (assuming that paths are relative to markdown file path)
const basePath = path.resolve(process.cwd(), parsedMdFilePath.dir);

// create options object with base path and page options
const html2pdfOptions = {
	base: `file://${basePath}/`,
	...config.pageOptions,
};

// create pdf from html string
html2pdf.create(htmlString, html2pdfOptions).toFile(pdfFileName, (err, res) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log('PDF created successfully:', res.filename);
});
