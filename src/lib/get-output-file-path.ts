import { parse, resolve } from 'path';

/**
 * Derive the output file path from a source file.
 */
export const getOutputFilePath = (mdFilePath: string, extension: 'html' | 'pdf') => {
	const { dir, name } = parse(mdFilePath);

	return resolve(dir, `${name}.${extension}`);
};
