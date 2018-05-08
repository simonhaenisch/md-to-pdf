#!/usr/bin/env node

// --
// Packages

const path = require('path');
const arg = require('arg');
const chalk = require('chalk');
const grayMatter = require('gray-matter');

// --
// Utils

const help = require('./util/help');
const { createStyleTag, createLinkTag } = require('./util/helpers');
const readFile = require('./util/read-file');
const getHtml = require('./util/get-html');
const writePdf = require('./util/write-pdf');
let config = require('./util/config');

// --
// Configure CLI Arguments

const args = arg({
	'--help': Boolean,
	'--version': Boolean,
	'--stylesheet': [String],
	'--css': String,
	'--body-class': [String],
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

async function main(args, config) {
	const mdFilePath = args._[0];
	const outputPath = args._[1];

	if (args['--version']) {
		console.log(require('./package').version);
		return 0;
	}

	if (args['--help'] || mdFilePath === undefined) {
		help();
		return 0;
	}

	// markdown file has to be processed first in order to get front-matter config
	const mdFileContent = readFile(path.resolve(mdFilePath), args['--md-file-encoding'] || config.md_file_encoding);
	const { content: md, data: frontMatterConfig } = grayMatter(mdFileContent);

	if (frontMatterConfig) {
		config = { ...config, ...frontMatterConfig };
	}

	if (args['--config-file']) {
		try {
			config = { ...config, ...require(path.resolve(args['--config-file'])) };
		} catch (err) {
			console.warn(chalk.red(`Warning: couldn't read config file: ${args['--config-file']}`));
		}
	}

	// sanitize array arguments
	for (const option of ['stylesheet', 'body_class']) {
		if (!Array.isArray(config[option])) {
			config[option] = [config[option]].filter(value => !!value);
		}
	}

	// merge cli args into config
	for (const option of [
		{ name: '--stylesheet' },
		{ name: '--css' },
		{ name: '--body-class' },
		{ name: '--highlight-style' },
		{ name: '--marked-options', json: true },
		{ name: '--html-pdf-options', json: true },
		{ name: '--stylesheet-encoding' },
	]) {
		const value = args[option.name];
		const key = option.name.substring(2).replace(/-/g, '_');
		if (value) {
			config[key] = option.json ? JSON.parse(value) : value;
		}
	}

	const headTags = [];

	for (const stylesheet of config.stylesheet) {
		const tag = stylesheet.startsWith('http')
			? createLinkTag(stylesheet)
			: createStyleTag(readFile(path.resolve(stylesheet), config.stylesheet_encoding));

		headTags.push(tag);
	}

	const highlightStylesheet = path.resolve(
		__dirname,
		'node_modules',
		'highlight.js',
		'styles',
		`${config.highlight_style}.css`,
	);

	headTags.push(createLinkTag(`file://${highlightStylesheet}`));

	if (config.css) {
		headTags.push(createStyleTag(config.css));
	}

	const html = getHtml(md, headTags, config);

	const pdf = await writePdf(mdFilePath, outputPath, html, config);

	console.log(`${chalk.green('PDF created successfully:')} ${chalk.bold(pdf.filename)}`);
	return 0;
}

// --
// Run

main(args, config)
	.then(process.exit)
	.catch(err => console.error(err) && process.exit(1));
