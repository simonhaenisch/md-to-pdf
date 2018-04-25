const { parse, resolve } = require('path');

module.exports = mdFilePath => resolve(process.cwd(), parse(mdFilePath).dir);
