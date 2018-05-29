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
const readFile = require('./util/read-file');
const getHtml = require('./util/get-html');
const writePdf = require('./util/write-pdf');
const config = require('./util/config');
const { getMarginObject } = require('./util/helpers');

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
	'--pdf-options': String,
	'--md-file-encoding': String,
	'--stylesheet-encoding': String,
	'--config-file': String,
	'--devtools': Boolean,

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

	if (args['--html-pdf-options']) {
		console.warn(
			[
				chalk.red(`--html-pdf-options is not a valid argument anymore. Use --pdf-options instead.`),
				chalk.gray(`valid options: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions`),
			].join('\n'),
		);
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
			config[option] = [config[option]].filter(value => Boolean(value));
		}
	}

	// merge cli args into config
	const jsonArgs = ['--marked-options', 'pdf-options'];
	for (const arg of Object.entries(args)) {
		const [argKey, argValue] = arg;
		const key = argKey.substring(2).replace(/-/g, '_');
		config[key] = jsonArgs.includes(argKey) ? JSON.parse(argValue) : argValue;
	}

	// sanitize the margin in pdf_options
	if (typeof config.pdf_options.margin === 'string') {
		config.pdf_options.margin = getMarginObject(config.pdf_options.margin);
	}

	const highlightStylesheet = path.resolve(
		__dirname,
		'node_modules',
		'highlight.js',
		'styles',
		`${config.highlight_style}.css`,
	);

	config.stylesheet.push(highlightStylesheet);

	const html = getHtml(md, config);

	const pdf = await writePdf(mdFilePath, outputPath, html, config);

	if (pdf.filename) {
		console.log(`${chalk.green('PDF created successfully:')} ${chalk.bold(pdf.filename)}`);
	}

	return 0;
}

// --
// Run

main(args, config)
	.then(process.exit) // eslint-disable-line promise/prefer-await-to-then
	.catch(err => console.error(err) && process.exit(1));
