#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const marked = require('marked');
const html2pdf = require('html-pdf');

// --
// Options

const pageOptions = {
	format: 'A4',
	border: {
		top: '30mm',
		right: '40mm',
		bottom: '30mm',
		left: '20mm',
	},
};

// set file encoding
const fileEncoding = 'utf-8';

// --
// Process CLI Arguments

// get command line arguments
const mdFile = process.argv[2];
const outFile = process.argv[3];

// check command line parameter
if (mdFile === undefined) {
	console.error('Error: missing argument, no markdown file specified.');
	process.exit(1);
}

// check if command line parameter is actually a call for help
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

// get readme content
const markdownString = fs.readFileSync(mdFile, fileEncoding);

// get css content
const cssString = fs.readFileSync(__dirname + '/markdown.css', fileEncoding);

// combine everything into one html string
const htmlString = `<!DOCTYPE html>
<html>
<head>
<meta charset="${fileEncoding}">
<style>
${cssString}
</style>
</head>
<body>
${marked(markdownString)}
</body></html>
`;

// --
// Create PDF from HTML

// parse markdown file path
const parsedMdFilePath = path.parse(mdFile);

// get or create pdf file name
const pdfFileName = outFile || path.join(parsedMdFilePath.dir, `${parsedMdFilePath.name}.pdf`);

// get base path to look for assets
// (assuming that paths are relative to markdown file path)
const basePath = path.resolve(process.cwd(), parsedMdFilePath.dir);

// compose object from base path and page options
const html2pdfOptions = Object.assign({}, { base: `file://${basePath}/` }, pageOptions);

// create pdf from html string
html2pdf.create(htmlString, html2pdfOptions).toFile(pdfFileName, (err, res) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log('PDF created successfully:', res.filename);
});
