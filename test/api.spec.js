const { resolve, basename } = require('path');
const test = require('ava');

const mdToPdf = require('..');

test('should compile the basic example to pdf', async t => {
	const pdf = await mdToPdf(resolve(__dirname, 'basic', 'test.md'));

	t.is(basename(pdf.filename), 'test.pdf');
});

test('should compile the basic example to html', async t => {
	const pdf = await mdToPdf(resolve(__dirname, 'basic', 'test.md'), { as_html: true });

	t.is(basename(pdf.filename), 'test.html');
});
