import test, { before } from 'ava';
import { readFileSync, unlinkSync } from 'fs';
import { basename, resolve } from 'path';
import { mdToPdf } from '..';

before(() => {
	const filesToDelete = [resolve(__dirname, 'basic', 'api-test.pdf'), resolve(__dirname, 'basic', 'api-test.html')];

	for (const file of filesToDelete) {
		try {
			unlinkSync(file);
		} catch (error) {
			if ((error as { code: string }).code !== 'ENOENT') {
				throw error;
			}
		}
	}
});

test('should compile the basic example to pdf', async (t) => {
	const pdf = await mdToPdf({ path: resolve(__dirname, 'basic', 'test.md') });

	t.is(pdf.filename, '');
	t.truthy(pdf.content);
});

test('should compile the basic example to pdf and write to disk', async (t) => {
	const pdf = await mdToPdf(
		{ path: resolve(__dirname, 'basic', 'test.md') },
		{ dest: resolve(__dirname, 'basic', 'api-test.pdf') },
	);

	t.is(basename(pdf.filename!), 'api-test.pdf');

	t.notThrows(() => readFileSync(resolve(__dirname, 'basic', 'api-test.pdf'), 'utf-8'));
});

test('should compile the basic example to html and write to disk', async (t) => {
	const pdf = await mdToPdf(
		{ path: resolve(__dirname, 'basic', 'test.md') },
		{ dest: resolve(__dirname, 'basic', 'api-test.html'), as_html: true },
	);

	t.is(basename(pdf.filename!), 'api-test.html');

	t.notThrows(() => readFileSync(resolve(__dirname, 'basic', 'api-test.html'), 'utf-8'));
});
