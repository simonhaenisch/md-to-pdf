const path = require('path');
const test = require('ava');
const serve = require('serve');
const getPort = require('get-port');
const config = require('./util/config');
const getHtml = require('./util/get-html');
const getMarkedWithHighlighter = require('./util/get-marked-with-highlighter');
const getPdfFilePath = require('./util/get-pdf-file-path');
const { getDir, getMarginObject } = require('./util/helpers');
const readFile = require('./util/read-file');
const waitForLocalhost = require('./util/wait-for-localhost');

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

test('getMarkedWithHighlighter should not highlight unknown code', t => {
	const marked = getMarkedWithHighlighter({});
	const html = marked('```\nvar foo="bar";\n```');
	t.true(html.includes('<code>'));
});

// --
// get-pdf-file-path

test('getPdfFilePath should return the same path but with .pdf extension', t => {
	const mdFilePath = path.posix.join('/', 'var', 'foo', 'bar.md');
	t.is('/var/foo/bar.pdf', getPdfFilePath(mdFilePath));
});

// --
// helpers

test('getDir should get the directory the given file is in', t => {
	const filePath = path.posix.join('/', 'var', 'foo', 'bar.txt');
	t.is('/var/foo', getDir(filePath));
});

test('getMarginObject should be able to handle all valid CSS margin inputs', t => {
	t.deepEqual(getMarginObject('1em'), { top: '1em', right: '1em', bottom: '1em', left: '1em' });
	t.deepEqual(getMarginObject('1px 2px'), { top: '1px', right: '2px', bottom: '1px', left: '2px' });
	t.deepEqual(getMarginObject('1mm 2mm 3mm'), { top: '1mm', right: '2mm', bottom: '3mm', left: '2mm' });
	t.deepEqual(getMarginObject('1in 2in 3in 4in'), { top: '1in', right: '2in', bottom: '3in', left: '4in' });
	t.is(getMarginObject(null), null);
	t.throws(() => getMarginObject({}));
	t.throws(() => getMarginObject(0));
	t.throws(() => getMarginObject('1em 2em 3em 4em 5em'));
});

// --
// read-file

test('readFile should return the content of a file', t => {
	const gitignoreContent = '.nyc_output\n.vscode\n';
	t.is(gitignoreContent, readFile('.gitignore'));
	t.is(gitignoreContent, readFile('.gitignore', 'windows1252'));
});

// --
// wait-for-localhost
test('waitForLocalhost should resolve once the server is available', async t => {
	t.plan(2);

	const port = await getPort();

	t.true(typeof port === 'number');

	const server = serve(__dirname, { port, local: true, clipless: true, silent: true });

	await waitForLocalhost(port);

	t.pass();

	server.stop();
});
