const fs = require('fs');
const iconv = require('iconv-lite');

/**
 * Read a file synchronously with the given encoding.
 * @param {String} file Path to file
 * @param {String} encoding File encoding
 * @returns its contents as a string.
 */
module.exports = (file, encoding = 'utf-8') =>
	/utf-?8/i.test(encoding) ? fs.readFileSync(file, encoding) : iconv.decode(fs.readFileSync(file), encoding);
