const { URL } = require('url');

/**
 * Check whether the input is a url.
 *
 * @param {string} input string to be tested
 *
 * @returns `true` if a URL can be constructed from `input`, `false` otherwise.
 */
module.exports = input => {
	try {
		return new URL(input).protocol.startsWith('http');
	} catch (error) {
		return false;
	}
};
