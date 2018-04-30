#!/usr/bin/env node

// --
// Packages

const path = require('path');
const arg = require('arg');

// --
// Utils

const help = require('./util/help');
const readFile = require('./util/read-file');
const getHtml = require('./util/get-html');
const writePdf = require('./util/write-pdf');
let config = require('./util/config');

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
	'--config-file': String,

	// aliases
	'-h': '--help',
	'-v': '--version',
});

// --
// Merge User Config

if (args['--config-file']) {
	config = {
		...config,
		...require(path.resolve(args['--config-file'])),
	};
}

// --
// Main

const main = (args, config) => {
	const mdFilePath = args._[0];
	const outputPath = args._[1];

	if (args['--version']) {
		console.log(require('./package').version);
		return;
	}

	if (args['--help'] || mdFilePath === undefined) {
		help();
		return;
	}

	const md = readFile(path.resolve(mdFilePath), args['--md-file-encoding'] || config.defaultEncoding);

	const css = readFile(
		path.resolve(args['--stylesheet'] || config.stylesheet),
		args['--stylesheet-encoding'] || config.defaultEncoding,
	);

	const highlightStylePath = path.resolve(
		'node_modules',
		'highlight.js',
		'styles',
		`${args['--highlight-style'] || config.highlightStyle}.css`,
	);

	const html = getHtml(md, css, highlightStylePath, config, JSON.parse(args['--marked-options'] || null));

	writePdf(mdFilePath, outputPath, html, config, JSON.parse(args['--html-pdf-options'] || null), (err, res) => {
		if (err) {
			console.error(err);
			process.exit(1);
		}

		console.log('PDF created successfully:', res.filename);
	});
};

// --
// Run

main(args, config);
