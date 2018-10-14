const { promisify } = require('util');
const readDir = promisify(require('fs').readdir);

const extensions = /\.(md|mkd|mdown|markdown)(\.txt)?$/i;

/**
 * Read the directory at the given path and get the markdown files it contains.
 *
 * @param {string} path path to read files from
 *
 * @returns a promise that resolves with the list of markdown files
 */
module.exports = async path => (await readDir(path)).filter(file => extensions.test(file));
