const path = require('path');
const grayMatter = require('gray-matter');

const readFile = require('./read-file');
const getHtml = require('./get-html');
const writeHtml = require('./write-html');
const writePdf = require('./write-pdf');
const { getMarginObject } = require('./helpers');

/**
 * Convert a markdown file to pdf.
 *
 * @param {string} mdFile path to the markdown file
 * @param {*} config config object
 * @param {number} port port that the server runs on
 * @param {*} args arguments if used by CLI
 *
 * @returns an object containing the PDF's or HTML's filename if it was written successfully
 */
module.exports = async (mdFile, config, port, args = {}) => {
	const mdFileContent = await readFile(path.resolve(mdFile), args['--md-file-encoding'] || config.md_file_encoding);

	const { content: md, data: frontMatterConfig } = grayMatter(mdFileContent);

	// merge front-matter config
	config = {
		...config,
		...frontMatterConfig,
		pdf_options: { ...config.pdf_options, ...frontMatterConfig.pdf_options },
	};

	// sanitize array cli arguments
	for (const option of ['stylesheet', 'body_class']) {
		if (!Array.isArray(config[option])) {
			config[option] = [config[option]].filter(value => Boolean(value));
		}
	}

	// merge cli args into config
	const jsonArgs = ['--marked-options', '--pdf-options', '--launch-options'];
	for (const arg of Object.entries(args)) {
		const [argKey, argValue] = arg;
		const key = argKey.substring(2).replace(/-/g, '_');

		if (key === 'dest' && config.dest) {
			// we already have a destination from the CLI args
			continue;
		}

		config[key] = jsonArgs.includes(argKey) ? JSON.parse(argValue) : argValue;
	}

	// sanitize the margin in pdf_options
	if (typeof config.pdf_options.margin === 'string') {
		config.pdf_options.margin = getMarginObject(config.pdf_options.margin);
	}

	const highlightStylesheet = path.resolve(
		path.dirname(require.resolve('highlight.js')),
		'..',
		'styles',
		`${config.highlight_style}.css`,
	);

	config.stylesheet = [...new Set([...config.stylesheet, highlightStylesheet])];

	const html = getHtml(md, config);

	const output = config.as_html
		? await writeHtml(mdFile, html, config)
		: await writePdf(mdFile, html, { ...config, port });

	if (!output.filename) {
		throw new Error(`Failed to create ${config.as_html ? 'HTML' : 'PDF'}`);
	}

	return output;
};
