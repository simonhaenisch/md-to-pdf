#!/usr/bin/env node

// --
// Packages

const path = require('path');
const arg = require('arg');
const parseFrontMatter = require('gray-matter');

// --
// Utils

const help = require('./util/help');
const readFile = require('./util/read-file');
const getHtml = require('./util/get-html');
const writePdf = require('./util/write-pdf');
let config = require('./util/config');

// --
// Configure CLI Arguments

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

	const mdFileContent = readFile(path.resolve(mdFilePath), args['--md-file-encoding'] || config.md_file_encoding);

	const { content: md, data: frontMatterConfig } = parseFrontMatter(mdFileContent);

	if (frontMatterConfig) {
		config = { ...config, ...frontMatterConfig };
	}

	if (args['--config-file']) {
		try {
			config = { ...config, ...require(path.resolve(args['--config-file'])) };
		} catch (err) {
			console.warn(`Warning: couldn't read config file: ${args['--config-file']}`);
		}
	}

	for (const option of [
		{ name: 'stylesheet', type: 'string' },
		{ name: 'stylesheet-encoding', type: 'string' },
		{ name: 'highlight-style', type: 'string' },
		{ name: 'marked-options', type: 'json' },
		{ name: 'html-pdf-options', type: 'json' },
	]) {
		const value = args[`--${option.name}`];
		const key = option.name.replace('-', '_');
		if (value) {
			config[key] = option.type === 'json' ? JSON.parse(value) : value;
		}
	}

	const css = readFile(path.resolve(__dirname, config.stylesheet), config.stylesheet_encoding);

	const highlightStylePath = path.resolve(
		__dirname,
		'node_modules',
		'highlight.js',
		'styles',
		`${config.highlight_style}.css`,
	);

	const html = getHtml(md, css, highlightStylePath, config);

	writePdf(mdFilePath, outputPath, html, config, (err, res) => {
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
