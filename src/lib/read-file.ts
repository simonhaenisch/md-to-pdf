import { promises as fs } from 'fs';

/**
 * Read a file with the given encoding, and return its content as a string.
 *
 * Uses iconv-lite to solve some issues with Windows encodings.
 */
export const readFile = async (file: string, encoding = 'utf-8') =>
	/utf-?8/i.test(encoding)
		? fs.readFile(file, { encoding: 'utf-8' })
		: (await import('iconv-lite')).decode(await fs.readFile(file), encoding);
