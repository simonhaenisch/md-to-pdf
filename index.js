#!/usr/bin/env node

// --
// Packages

const path = require('path');
const arg = require('arg');
const chalk = require('chalk');
const Listr = require('listr');
const grayMatter = require('gray-matter');
const getPort = require('get-port');

// --
// Utils

const help = require('./util/help');
const getMdFilesInDir = require('./util/get-md-files-in-dir');
const readFile = require('./util/read-file');
const serveDirectory = require('./util/serve-dir');
const getHtml = require('./util/get-html');
const writePdf = require('./util/write-pdf');
const config = require('./util/config');
const { getMarginObject, getDir } = require('./util/helpers');

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
	const input = args._[0];
	const output = args._[1];

	if (args['--version']) {
		return console.log(require('./package').version);
	}

	if (args['--help']) {
		return help();
	}

	// throw warning when using --html-pdf-options flag
	if (args['--html-pdf-options']) {
		console.warn(
			[
				chalk.red(`--html-pdf-options is not a valid argument anymore. Use --pdf-options instead.`),
				chalk.gray(`valid options: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions`),
			].join('\n'),
		);
	}

	const mdFiles = input ? [input] : await getMdFilesInDir('.');

	if (mdFiles.length === 0) {
		return help();
	}

	// merge config from config file
	if (args['--config-file']) {
		try {
			config = { ...config, ...require(path.resolve(args['--config-file'])) };
		} catch (error) {
			console.warn(chalk.red(`Warning: couldn't read config file: ${args['--config-file']}`));
		}
	}

	// serve directory of first file because all files will be in the same dir
	const port = await getPort();
	const server = await serveDirectory(getDir(mdFiles[0]), port);

	// create list of tasks and run concurrently
	await new Listr(
		mdFiles.map(mdFile => ({
			title: `generating PDF from ${chalk.underline(mdFile)}`,
			task: () => convertToPdf(mdFile),
		})),
		{ concurrent: true, exitOnError: false },
	)
		.run()
		.then(server.close)
		.catch(error => (args['--debug'] && console.error(error)) || process.exit(1));

	async function convertToPdf(mdFile) {
		const mdFileContent = await readFile(path.resolve(mdFile), args['--md-file-encoding'] || config.md_file_encoding);

		const { content: md, data: frontMatterConfig } = grayMatter(mdFileContent);

		// merge front-matter config
		config = { ...config, ...frontMatterConfig };

		// sanitize array cli arguments
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

		config.stylesheet = [...new Set([...config.stylesheet, highlightStylesheet])];

		const html = getHtml(md, config);

		const pdf = await writePdf(mdFile, output, html, { ...config, port });

		if (!pdf.filename) {
			throw new Error(`Failed to create PDF`);
		}
	}
}

// --
// Run

main(args, config)
	.then(() => process.exit(0))
	.catch(error => console.error(error) || process.exit(1));
