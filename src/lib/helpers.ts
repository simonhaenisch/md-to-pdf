import { parse, resolve } from 'path';
import { PDFOptions } from 'puppeteer';

/**
 * Get the directory that a file is in.
 */
export const getDir = (filePath: string) => resolve(parse(filePath).dir);

/**
 * Get a margin object from a CSS-like margin string.
 */
export const getMarginObject = (margin: string): PDFOptions['margin'] => {
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
		: undefined;
};
