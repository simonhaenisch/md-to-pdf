import { dirname, resolve } from 'path';
const grayMatter = require('gray-matter');

import { Config } from './config';
import { readFile } from './read-file';
import { getMarginObject } from './helpers';
import { getOutputFilePath } from './get-output-file-path';
import { getHtml } from './get-html';
import { writeOutput } from './write-output';

/**
 * Convert markdown to pdf.
 */
export const convertMdToPdf = async (input: { path: string } | { content: string }, config: Config, args: any = {}) => {
	const mdFileContent =
		'content' in input
			? input.content
			: await readFile(input.path, args['--md-file-encoding'] || config.md_file_encoding);

	const { content: md, data: frontMatterConfig } = grayMatter(mdFileContent);

	// merge front-matter config
	config = {
		...config,
		...(frontMatterConfig as Config),
		pdf_options: { ...config.pdf_options, ...frontMatterConfig.pdf_options },
	};

	const { headerTemplate, footerTemplate, displayHeaderFooter } = config.pdf_options;

	if ((headerTemplate || footerTemplate) && displayHeaderFooter === undefined) {
		config.pdf_options.displayHeaderFooter = true;
	}

	// sanitize array cli arguments
	for (const option of ['stylesheet', 'body_class']) {
		if (!Array.isArray((config as any)[option])) {
			(config as any)[option] = [(config as any)[option]].filter(value => Boolean(value));
		}
	}

	// merge cli args into config
	const jsonArgs = ['--marked-options', '--pdf-options', '--launch-options'];
	for (const arg of Object.entries(args)) {
		const [argKey, argValue] = arg as [string, string];
		const key = argKey.substring(2).replace(/-/g, '_');

		(config as any)[key] = jsonArgs.includes(argKey) ? JSON.parse(argValue) : argValue;
	}

	// sanitize the margin in pdf_options
	if (typeof config.pdf_options.margin === 'string') {
		config.pdf_options.margin = getMarginObject(config.pdf_options.margin);
	}

	// set output destination
	if (!config.dest) {
		config.dest =
			'path' in input
				? getOutputFilePath(input.path, config.as_html ? 'html' : 'pdf')
				: resolve(process.cwd(), `output.${config.as_html ? 'html' : 'pdf'}`);
	}

	const highlightStylesheet = resolve(
		dirname(require.resolve('highlight.js')),
		'..',
		'styles',
		`${config.highlight_style}.css`,
	);

	config.stylesheet = [...new Set([...config.stylesheet, highlightStylesheet])];

	const html = getHtml(md, config);

	const relativePath = 'path' in input ? resolve(input.path).replace(config.basedir, '') : '/';

	const output = await writeOutput(html, relativePath, config);

	if (!('filename' in output)) {
		throw new Error(`Failed to create ${config.as_html ? 'HTML' : 'PDF'}.`);
	}

	return output as { filename: string };
};
