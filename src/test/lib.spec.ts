import test from 'ava';
import { Renderer } from 'marked';
import { EOL } from 'os';
import { posix, resolve, sep } from 'path';
import { defaultConfig } from '../lib/config';
import { getHtml } from '../lib/get-html';
import { getMarked } from '../lib/get-marked-with-highlighter';
import { getOutputFilePath } from '../lib/get-output-file-path';
import { getDir, getMarginObject } from '../lib/helpers';
import { isHttpUrl } from '../lib/is-http-url';
import { isMdFile } from '../lib/is-md-file';
import { readFile } from '../lib/read-file';

// --
// config
test("gray-matter's js engine is disabled by default", (t) => {
	t.throws(() => {
		throw (defaultConfig.gray_matter_options.engines!.js as () => Error)();
	});
});

// --
// helpers

test('getDir should get the directory the given file is in', (t) => {
	const filePath = posix.join('/', 'var', 'foo', 'bar.txt');

	t.regex(getDir(filePath), new RegExp(`\\${sep}var\\${sep}foo`));
});

test('getMarginObject should be able to handle all valid CSS margin inputs', (t) => {
	t.deepEqual(getMarginObject('1em'), { top: '1em', right: '1em', bottom: '1em', left: '1em' });
	t.deepEqual(getMarginObject('1px 2px'), { top: '1px', right: '2px', bottom: '1px', left: '2px' });
	t.deepEqual(getMarginObject('1mm 2mm 3mm'), { top: '1mm', right: '2mm', bottom: '3mm', left: '2mm' });
	t.deepEqual(getMarginObject('1in 2in 3in 4in'), { top: '1in', right: '2in', bottom: '3in', left: '4in' });

	t.is(getMarginObject(''), undefined);

	t.throws(() => getMarginObject(undefined as any));
	t.throws(() => getMarginObject({} as any));
	t.throws(() => getMarginObject(0 as any));
	t.throws(() => getMarginObject('1em 2em 3em 4em 5em'));
});

// --
// get-html

test('getHtml should return a valid html document', (t) => {
	const html = getHtml('', defaultConfig).replace(/\n/g, '');

	t.regex(html, /<!DOCTYPE html>.*<html>.*<head>.*<body class="">.*<\/body>.*<\/html>/);
});

test('getHtml should inject rendered markdown', (t) => {
	const html = getHtml('# Foo', defaultConfig).replace(/\n/g, '');

	t.regex(html, /<body class="">\s*<h1 id="foo">Foo<\/h1>\s*<\/body>/);
});

test('getHtml should inject body classes', (t) => {
	const html = getHtml('', { ...defaultConfig, body_class: ['foo', 'bar'] }).replace(/\n/g, '');

	t.regex(html, /<body class="foo bar">/);
});

test('getHtml should have the title set', (t) => {
	const html = getHtml('', { ...defaultConfig, document_title: 'Foo' }).replace(/\n/g, '');

	t.regex(html, /<title>Foo<\/title>/);
});

// --
// get-marked

test('getMarked should highlight js code', (t) => {
	const marked = getMarked({}, []);
	const html = marked('```js\nvar foo="bar";\n```');

	t.true(html.includes('<code class="hljs js">'));
});

test('getMarked should highlight unknown code as plaintext', (t) => {
	const marked = getMarked({}, []);
	const html = marked('```\nvar foo="bar";\n```');

	t.true(html.includes('<code>'));
});

test('getMarked should accept a custom renderer', (t) => {
	const renderer = new Renderer();

	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	renderer.link = (href, _, text) => `<a class="custom" href="${href}">${text}</a>`;

	const marked = getMarked({ renderer }, []);
	const html = marked('[Foo](/bar)');

	t.true(html.includes('<a class="custom" href="/bar">Foo</a>'));
});

test('getMarked should accept a custom renderer with custom code highlighter', (t) => {
	const renderer = new Renderer();

	renderer.code = (code) => `<custom-code>${code}</custom-code>`;

	const marked = getMarked({ renderer }, []);
	const html = marked('```\nvar foo="bar";\n```');

	t.true(html.includes('<custom-code>var foo="bar";</custom-code>'));
});

// --
// get-pdf-file-path

test('getOutputFilePath should return the same path but with different extension', (t) => {
	const mdFilePath = posix.join('/', 'var', 'foo', 'bar.md');

	t.is(getOutputFilePath(mdFilePath, 'pdf'), `${sep}var${sep}foo${sep}bar.pdf`);
	t.is(getOutputFilePath(mdFilePath, 'html'), `${sep}var${sep}foo${sep}bar.html`);
});

// --
// read-file

test('readFile should return the content of a file', async (t) => {
	const gitignore = resolve(__dirname, 'basic', 'markdown-mark.svg');
	const gitignoreContent = `<svg xmlns="http://www.w3.org/2000/svg" width="208" height="128" viewBox="0 0 208 128"><rect width="198" height="118" x="5" y="5" ry="10" stroke="#000" stroke-width="10" fill="none"/><path d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z"/></svg>${EOL}`;

	t.is(await readFile(gitignore), gitignoreContent);
	t.is(await readFile(gitignore, 'windows1252'), gitignoreContent);
});

// --
// is-md-file

test('isMdFile should return true if the file extension indicates a markdown file', (t) => {
	t.is(isMdFile('md.txt'), false);
	t.is(isMdFile('.md.txt'), true);
	t.is(isMdFile('test.txt'), false);
	t.is(isMdFile('test.md'), true);
	t.is(isMdFile('test.md.notmd'), false);
	t.is(isMdFile('test.md.txt'), true);
	t.is(isMdFile('test.mkd'), true);
	t.is(isMdFile('test.mkd.txt'), true);
	t.is(isMdFile('test.mdown'), true);
	t.is(isMdFile('test.mdown.txt'), true);
	t.is(isMdFile('test.markdown'), true);
	t.is(isMdFile('test.markdown.txt'), true);
});

// --
// is-url

test('isUrl should return true for strings that are valid http(s) urls', (t) => {
	t.is(isHttpUrl('foo'), false);
	t.is(isHttpUrl('foo/bar'), false);
	t.is(isHttpUrl('/foo/bar'), false);
	t.is(isHttpUrl('http/foo/bar'), false);
	t.is(isHttpUrl('http://foo/bar'), true);
	t.is(isHttpUrl('foo://bar'), false);
	t.is(isHttpUrl('file:///foobar'), false);
	t.is(isHttpUrl('C:\\foo\\bar'), false);
});
