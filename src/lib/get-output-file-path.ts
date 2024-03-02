import { join, parse } from 'path';

/**
 * Derive the output file path from a source file.
 */
export const getOutputFilePath = (mdFilePath: string, extension: 'html' | 'pdf') => {
	let { dir, name } = parse(mdFilePath);

	// temporarily hardcode the output directory
	dir = '/Users/log/Github/md-to-pdf/src/test/output';
	return join(dir, `${name}.${extension}`);
};