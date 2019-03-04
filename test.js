const path = require('path');
const test = require('ava');

const config = require('./lib/config');
const getHtml = require('./lib/get-html');
const getMarkedWithHighlighter = require('./lib/get-marked-with-highlighter');
const getPdfFilePath = require('./lib/get-pdf-file-path');
const { getDir, getMarginObject } = require('./lib/helpers');
const readFile = require('./lib/read-file');
const isMdFile = require('./lib/is-md-file');
const isHttpUrl = require('./lib/is-http-url');
const getMdFilesInDir = require('./lib/get-md-files-in-dir');

// --
// get-html

test('getHtml should return a valid html document', t => {
	const html = getHtml('', config).replace(/\n/g, '');

	t.regex(html, /<!DOCTYPE html>.*<html>.*<head>.*<body class="">.*<\/body>.*<\/html>/);
});

test('getHtml should inject rendered markdown', t => {
	const html = getHtml('# Foo', config).replace(/\n/g, '');

	t.regex(html, /<body class=""><h1 id="foo">Foo<\/h1>.*<\/body>/);
});

test('getHtml should inject body classes', t => {
	const html = getHtml('', { ...config, body_class: ['foo', 'bar'] }).replace(/\n/g, '');

	t.regex(html, /<body class="foo bar">/);
});

// --
// get-marked-with-highlighter

test('getMarkedWithHighlighter should highlight js code', t => {
	const marked = getMarkedWithHighlighter({});
	const html = marked('```js\nvar foo="bar";\n```');

	t.true(html.includes('<code class="hljs js">'));
});

test('getMarkedWithHighlighter should highlight unknown code as plaintext', t => {
	const marked = getMarkedWithHighlighter({});
	const html = marked('```\nvar foo="bar";\n```');

	t.true(html.includes('<code class="hljs plaintext">'));
});

// --
// get-pdf-file-path

test('getPdfFilePath should return the same path but with .pdf extension', t => {
	const mdFilePath = path.posix.join('/', 'var', 'foo', 'bar.md');

	t.is(getPdfFilePath(mdFilePath), '/var/foo/bar.pdf');
});

// --
// helpers

test('getDir should get the directory the given file is in', t => {
	const filePath = path.posix.join('/', 'var', 'foo', 'bar.txt');

	t.is(getDir(filePath), '/var/foo');
});

test('getMarginObject should be able to handle all valid CSS margin inputs', t => {
	t.deepEqual(getMarginObject('1em'), { top: '1em', right: '1em', bottom: '1em', left: '1em' });
	t.deepEqual(getMarginObject('1px 2px'), { top: '1px', right: '2px', bottom: '1px', left: '2px' });
	t.deepEqual(getMarginObject('1mm 2mm 3mm'), { top: '1mm', right: '2mm', bottom: '3mm', left: '2mm' });
	t.deepEqual(getMarginObject('1in 2in 3in 4in'), { top: '1in', right: '2in', bottom: '3in', left: '4in' });

	t.is(getMarginObject(''), null);

	t.throws(() => getMarginObject(null));
	t.throws(() => getMarginObject({}));
	t.throws(() => getMarginObject(0));
	t.throws(() => getMarginObject('1em 2em 3em 4em 5em'));
});

// --
// read-file

test('readFile should return the content of a file', async t => {
	const gitignoreContent = '.vscode\n.nyc_output\ncoverage\n';

	t.is(await readFile('.gitignore'), gitignoreContent);
	t.is(await readFile('.gitignore', 'windows1252'), gitignoreContent);
});

// --
// is-md-file

test('isMdFile should return true if the file extension indicates a markdown file', t => {
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

test('isUrl should return true for strings that are valid http(s) urls', t => {
	t.is(isHttpUrl('foo'), false);
	t.is(isHttpUrl('foo/bar'), false);
	t.is(isHttpUrl('/foo/bar'), false);
	t.is(isHttpUrl('http/foo/bar'), false);
	t.is(isHttpUrl('http://foo/bar'), true);
	t.is(isHttpUrl('foo://bar'), false);
	t.is(isHttpUrl('file:///foobar'), false);
	t.is(isHttpUrl('C:\\foo\\bar'), false);
});

// --
// get-md-files-in-dir

test('getMdFilesInDir should return the list of markdown files in a directory', async t => {
	t.deepEqual(await getMdFilesInDir('./lib'), []);
	t.deepEqual(await getMdFilesInDir('.'), ['changelog.md', 'readme.md']);
});
