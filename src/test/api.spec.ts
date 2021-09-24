import test, { before } from 'ava';
import { readFileSync, unlinkSync } from 'fs';
import { basename, resolve } from 'path';
import { getDocument } from 'pdfjs-dist/legacy/build/pdf';
import { mdToPdf } from '..';

const getPdfTextContent = async (content: Buffer) => {
	const doc = await getDocument({ data: content }).promise;
	const page = await doc.getPage(1);
	const textContent = (await page.getTextContent()).items.map(({ str }) => str).join('');

	return textContent;
};

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

test('compile the basic example to pdf', async (t) => {
	const pdf = await mdToPdf({ path: resolve(__dirname, 'basic', 'test.md') });

	t.is(pdf.filename, '');
	t.truthy(pdf.content);
	t.truthy(pdf.content instanceof Buffer);
});

test('compile the basic example to pdf and write to disk', async (t) => {
	const pdf = await mdToPdf(
		{ path: resolve(__dirname, 'basic', 'test.md') },
		{ dest: resolve(__dirname, 'basic', 'api-test.pdf') },
	);

	t.is(basename(pdf.filename!), 'api-test.pdf');

	t.notThrows(() => readFileSync(resolve(__dirname, 'basic', 'api-test.pdf'), 'utf-8'));
});

test('compile some content to html', async (t) => {
	const html = await mdToPdf({ content: '# Foo' }, { as_html: true });

	t.is(html.filename, '');
	t.is(typeof html.content, 'string');
	t.truthy(html.content.includes('<h1 id="foo">Foo</h1>'));
});

test('compile the basic example to html and write to disk', async (t) => {
	const html = await mdToPdf(
		{ path: resolve(__dirname, 'basic', 'test.md') },
		{ dest: resolve(__dirname, 'basic', 'api-test.html'), as_html: true },
	);

	t.is(basename(html.filename!), 'api-test.html');

	t.notThrows(() => readFileSync(resolve(__dirname, 'basic', 'api-test.html'), 'utf-8'));
});

test('compile the MathJax test', async (t) => {
	const pdf = await mdToPdf({ path: resolve(__dirname, 'mathjax', 'math.md') });

	t.is(pdf.filename, '');
	t.truthy(pdf.content);

	const textContent = await getPdfTextContent(pdf.content);

	t.true(textContent.startsWith('Formulas with MathJax'));
	t.true(textContent.includes('a≠0'));
});

test('the JS engine is disabled by default', async (t) => {
	const css = '`body::before { display: block; content: "${"i am injected"}"}`'; // eslint-disable-line no-template-curly-in-string

	const pdf = await mdToPdf({ content: `---js\n{ css: ${css} }\n---` });

	const textContent = await getPdfTextContent(pdf.content);

	t.is(textContent, '');
});

test('the JS engine for front-matter can be enabled', async (t) => {
	const css = '`body::before { display: block; content: "${"i am injected"}"}`'; // eslint-disable-line no-template-curly-in-string

	const pdf = await mdToPdf({ content: `---js\n{ css: ${css} }\n---` }, { gray_matter_options: undefined });

	const textContent = await getPdfTextContent(pdf.content);

	t.is(textContent, 'i am injected');
});
