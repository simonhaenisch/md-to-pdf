const { parse, resolve } = require('path');

/**
 * Get the directory that a file is in.
 *
 * @param {String} filePath Path to the source markdown file
 *
 * @returns the assets base path, which is the directory of the source markdown
 * file
 */
module.exports.getDir = filePath => resolve(parse(filePath).dir);

/**
 * Get a margin object from a string.
 *
 * @param {String} margin A CSS-like margin setting
 *
 * @returns object with keys 'top', 'right', 'bottom', 'left'
 */
module.exports.getMarginObject = margin => {
	if (margin === null) {
		return null;
	}

	const [top, right, bottom, left, ...remaining] = margin.split(' ');

	if (typeof margin === 'string' && remaining.length === 0) {
		if (left) {
			return { top, right, bottom, left };
		}

		if (bottom) {
			return { top, right, bottom, left: right };
		}

		if (right) {
			return { top, right, bottom: top, left: right };
		}

		if (top) {
			return { top, right: top, bottom: top, left: top };
		}
	}

	throw new Error(`invalid margin input: ${margin}`);
};
