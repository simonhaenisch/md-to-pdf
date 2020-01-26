import { resolve, basename } from 'path';
import test from 'ava';

import { mdToPdf } from '../src';

test('should compile the basic example to pdf', async t => {
	const pdf = await mdToPdf(
		{ path: resolve(__dirname, 'basic', 'test.md') },
		{ dest: resolve(__dirname, 'basic', 'api-test.pdf') },
	);

	t.is(basename(pdf.filename), 'api-test.pdf');
});

test('should compile the basic example to html', async t => {
	const pdf = await mdToPdf(
		{ path: resolve(__dirname, 'basic', 'test.md') },
		{ dest: resolve(__dirname, 'basic', 'api-test.html'), as_html: true },
	);

	t.is(basename(pdf.filename), 'api-test.html');
});
