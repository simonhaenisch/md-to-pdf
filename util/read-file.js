const fs = require('fs');
const iconv = require('iconv-lite');

module.exports = (file, encoding) =>
	/utf-?8/i.test(encoding) ? fs.readFileSync(file, encoding) : iconv.decode(fs.readFileSync(file), encoding);
