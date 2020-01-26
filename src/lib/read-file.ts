import { promisify } from 'util';
import { readFile as fsReadFile } from 'fs';
import iconv from 'iconv-lite';

const readFileAsync = promisify(fsReadFile);

/**
 * Read a file synchronously with the given encoding, and return its content as a string.
 *
 * Uses iconv-lite to solve some issues with Windows encodings.
 */
export const readFile = async (file: string, encoding: string = 'utf-8') =>
	/utf-?8/i.test(encoding) ? readFileAsync(file, { encoding }) : iconv.decode(await readFileAsync(file), encoding);
