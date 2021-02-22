import { promises as fs } from 'fs';
import grayMatter from 'gray-matter';
import { dirname, resolve } from 'path';
import { Config } from './config';
import { generateOutput } from './generate-output';
import { getHtml } from './get-html';
import { getOutputFilePath } from './get-output-file-path';
import { getMarginObject } from './helpers';
import { readFile } from './read-file';

type CliArgs = typeof import('../cli').cliFlags;

/**
 * Convert markdown to pdf.
 */
export const convertMdToPdf = async (
	input: { path: string } | { content: string },
	config: Config,
	args: CliArgs = {} as CliArgs,
) => {
	const mdFileContent =
		'content' in input
			? input.content
			: await readFile(input.path, args['--md-file-encoding'] ?? config.md_file_encoding);

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

	const arrayOptions = ['body_class', 'script', 'stylesheet'] as const;

	// sanitize frontmatter array options
	for (const option of arrayOptions) {
		if (!Array.isArray(config[option])) {
			config[option] = [config[option]].filter(Boolean) as any;
		}
	}

	const jsonArgs = new Set(['--marked-options', '--pdf-options', '--launch-options']);

	// merge cli args into config
	for (const arg of Object.entries(args)) {
		const [argKey, argValue] = arg as [string, string];
		const key = argKey.slice(2).replace(/-/g, '_');

		(config as Record<string, any>)[key] = jsonArgs.has(argKey) ? JSON.parse(argValue) : argValue;
	}

	// sanitize the margin in pdf_options
	if (typeof config.pdf_options.margin === 'string') {
		config.pdf_options.margin = getMarginObject(config.pdf_options.margin);
	}

	// set output destination
	if (config.dest === undefined) {
		config.dest = 'path' in input ? getOutputFilePath(input.path, config.as_html ? 'html' : 'pdf') : 'stdout';
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

	const output = await generateOutput(html, relativePath, config);

	if (!output) {
		if (config.devtools) {
			throw new Error('No file is generated with --devtools.');
		}

		throw new Error(`Failed to create ${config.as_html ? 'HTML' : 'PDF'}.`);
	}

	if (output.filename) {
		if (output.filename === 'stdout') {
			process.stdout.write(output.content);
		} else {
			await fs.writeFile(output.filename, output.content);
		}
	}

	return output;
};
