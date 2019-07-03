import { readdir } from 'fs';
import { promisify } from 'util';
import { isMdFile } from './is-md-file';

const readDir = promisify(readdir);

/**
 * Read the directory at the given path and get the markdown files it contains.
 *
 * @returns a promise that resolves with the list of markdown files
 */
export const getMdFilesInDir = async (path: string) => (await readDir(path)).filter(isMdFile);
