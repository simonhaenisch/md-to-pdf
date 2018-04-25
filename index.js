#!/usr/bin/env node

// --
// Packages

const { join } = require('path');
const arg = require('arg');

// --
// Utils

const config = require('./util/config');
const help = require('./util/help');
const readFile = require('./util/read-file');
const getHtml = require('./util/get-html');
const writePdf = require('./util/write-pdf');

// --
// Process CLI Arguments

const args = arg({
	'--help': Boolean,
	'--version': Boolean,
	'--stylesheet': String,
	'--highlight-style': String,
	'--marked-options': String,
	'--html-pdf-options': String,
	'--md-file-encoding': String,
	'--stylesheet-encoding': String,

	// aliases
	'-h': '--help',
	'-v': '--version',
});

const mdFilePath = args._[0];
const outputPath = args._[1];

if (args['--version']) {
	console.log(require('./package').version);
	process.exit();
}

if (args['--help'] || mdFilePath === undefined) {
	help();
}

const main = (mdFilePath, outputPath, args) => {
	const md = readFile(join(__dirname, mdFilePath), args['--md-file-encoding'] || config.defaultEncoding);

	const css = readFile(
		join(__dirname, args['--stylesheet'] || config.stylesheet),
		args['--stylesheet-encoding'] || config.defaultEncoding,
	);

	const highlightStylePath = join(
		__dirname,
		'node_modules',
		'highlight.js',
		'styles',
		`${args['--highlight-style'] || config.highlightStyle}.css`,
	);

	const html = getHtml(md, css, highlightStylePath, args['--marked-options']);

	writePdf(mdFilePath, outputPath, html, args['--html-pdf-options'], (err, res) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}

		console.log('PDF created successfully:', res.filename);
	});
};

main(mdFilePath, outputPath, args);
