import { parse, join } from 'path';
import { Config } from './config';

/**
 * Derive the output file path from the source markdown file.
 */
export const getOutputFilePath = (mdFilePath: string, config: Partial<Config>) => {
	const { dir, name } = parse(mdFilePath);
	const extension = config.as_html ? 'html' : 'pdf';

	return join(dir, `${name}.${extension}`);
};
