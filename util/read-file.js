const fs = require('fs');
const iconv = require('iconv-lite');

/**
 * Reads the file synchronously with the given encoding and returns its contents
 * as a string.
 * @param {String} file Path to file
 * @param {String} encoding File encoding
 */
module.exports = (file, encoding) =>
	/utf-?8/i.test(encoding) ? fs.readFileSync(file, encoding) : iconv.decode(fs.readFileSync(file), encoding);
