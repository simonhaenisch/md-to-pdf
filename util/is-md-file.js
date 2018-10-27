const extensions = /\.(md|mkd|mdown|markdown)(\.txt)?$/i;

/**
 * Check whether a path is a markdown file.
 *
 * @param {string} path file path
 *
 * @return true if the extension indicates it's a markdown file.
 */
module.exports = path => extensions.test(path);
