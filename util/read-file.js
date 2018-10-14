const fs = require('fs');
const iconv = require('iconv-lite');

/**
 * Read a file synchronously with the given encoding.
 *
 * Uses iconv-lite to solve some issues with Windows encodings.
 *
 * @param {string} file path to file
 * @param {string} encoding eile encoding
 *
 * @returns a promise resolving with the file's content as a string
 */
module.exports = (file, encoding = 'utf-8') =>
	/utf-?8/i.test(encoding) ? fs.readFileSync(file, encoding) : iconv.decode(fs.readFileSync(file), encoding);
