const { parse, resolve } = require('path');

/**
 * Get the directory that a file is in.
 * @param {String} filePath Path to the source markdown file
 * @returns the assets base path, which is the directory of the source markdown
 * file.
 */
module.exports.getDir = filePath => resolve(parse(filePath).dir);

/**
 * Get a margin object from a string.
 * @param {String} margin A CSS-like margin setting
 * @returns object with keys 'top', 'right', 'bottom', 'left'
 */
module.exports.getMarginObject = margin => {
	if (margin === null) {
		return null;
	}

	if (typeof margin === 'string') {
		const margins = margin.split(' ');
		const [top, right, bottom, left] = margins;

		switch (margins.length) {
			case 1:
				return { top, right: top, bottom: top, left: top };
			case 2:
				return { top, right, bottom: top, left: right };
			case 3:
				return { top, right, bottom, left: right };
			case 4:
				return { top, right, bottom, left };

			default:
				break; // will throw the error below
		}
	}

	throw new Error(`invalid margin input: ${margin}`);
};
