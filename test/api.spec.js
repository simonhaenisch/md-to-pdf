const { resolve, basename } = require('path');
const test = require('ava');

const mdToPdf = require('..');

test('should compile the basic example to pdf', async t => {
	const pdf = await mdToPdf(resolve(__dirname, 'basic', 'test.md'), {
		dest: resolve(__dirname, 'basic', 'api-test.pdf'),
	});

	t.is(basename(pdf.filename), 'api-test.pdf');
});

test('should compile the basic example to html', async t => {
	const pdf = await mdToPdf(resolve(__dirname, 'basic', 'test.md'), {
		as_html: true,
		dest: resolve(__dirname, 'basic', 'api-test.html'),
	});

	t.is(basename(pdf.filename), 'api-test.html');
});
