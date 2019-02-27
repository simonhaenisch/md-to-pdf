const { parse, resolve } = require('path');

/**
 * Get the directory that a file is in.
 *
 * @param {string} filePath path to the source markdown file
 *
 * @returns the assets base path, which is the directory of the source markdown
 * file
 */
module.exports.getDir = filePath => resolve(parse(filePath).dir);

/**
 * Get a margin object from a string.
 *
 * @param {string} margin a CSS-like margin setting
 *
 * @returns object with keys 'top', 'right', 'bottom', 'left'
 */
module.exports.getMarginObject = margin => {
	if (typeof margin !== 'string') {
		throw new TypeError(`margin needs to be a string.`);
	}

	const [top, right, bottom, left, ...remaining] = margin.split(' ');

	if (remaining.length > 0) {
		throw new Error(`invalid margin input "${margin}": can have max 4 values.`);
	}

	return left
		? { top, right, bottom, left }
		: bottom
		? { top, right, bottom, left: right }
		: right
		? { top, right, bottom: top, left: right }
		: top
		? { top, right: top, bottom: top, left: top }
		: null;
};
