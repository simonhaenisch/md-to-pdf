import { dirname, resolve } from 'path';
const grayMatter = require('gray-matter');

import { Config } from './config';
import { readFile } from './read-file';
import { getHtml } from './get-html';
import { writeOutput } from './write-output';
import { getMarginObject } from './helpers';

/**
 * Convert a markdown file to pdf.
 */
export const convertMdToPdf = async (mdFile: string, config: Config, args: any = {}) => {
	const mdFileContent = await readFile(resolve(mdFile), args['--md-file-encoding'] || config.md_file_encoding);

	const { content: md, data: frontMatterConfig } = grayMatter(mdFileContent);

	// merge front-matter config
	config = {
		...config,
		...(frontMatterConfig as Config),
		pdf_options: { ...config.pdf_options, ...frontMatterConfig.pdf_options },
	};

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
	if (typeof config.pdf_options!.margin === 'string') {
		config.pdf_options!.margin = getMarginObject(config.pdf_options!.margin);
	}

	const highlightStylesheet = resolve(
		dirname(require.resolve('highlight.js')),
		'..',
		'styles',
		`${config.highlight_style}.css`,
	);

	config.stylesheet = [...new Set([...config.stylesheet, highlightStylesheet])];

	const html = getHtml(md, config);

	const output = await writeOutput(mdFile, html, config);

	if (!output.filename) {
		throw new Error(`Failed to create ${config.as_html ? 'HTML' : 'PDF'}.`);
	}

	return output as { filename: string };
};
