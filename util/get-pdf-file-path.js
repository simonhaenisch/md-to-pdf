const { parse, join } = require('path');

module.exports = mdFilePath => join(parse(mdFilePath).dir, parse(mdFilePath).name + '.pdf');
