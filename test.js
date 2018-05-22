const path = require('path');
const test = require('ava');
const getHtml = require('./util/get-html');
const getMarkedWithHighlighter = require('./util/get-marked-with-highlighter');
const getPdfFilePath = require('./util/get-pdf-file-path');
const { getDir, createStyleTag, createLinkTag } = require('./util/helpers');
const readFile = require('./util/read-file');

// --
// get-html

test('getHtml should return a valid html document', t => {
	const html = getHtml('', [], { body_class: [] }).replace(/\n/g, '');
	t.regex(html, /<!DOCTYPE html>.*<html>.*<head>.*<body class="">.*<\/body>.*<\/html>/);
});

test('getHtml should inject rendered markdown', t => {
	const html = getHtml('# Foo', [], { body_class: [] }).replace(/\n/g, '');
	t.regex(html, /<body class=""><h1 id="foo">Foo<\/h1>.*<\/body>/);
});

test('getHtml should inject head tags', t => {
	const html = getHtml('', ['<style></style>', '<link/>'], { body_class: [] }).replace(/\n/g, '');
	t.regex(html, /<head><style><\/style><link\/><\/head>/);
});

test('getHtml should inject body classes', t => {
	const html = getHtml('', [], { body_class: ['foo', 'bar'] }).replace(/\n/g, '');
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

test('createStyleTag should wrap a string of CSS rules in a style tag', t => {
	const css = 'body { color: tomato; }';
	t.is('<style>body { color: tomato; }</style>', createStyleTag(css));
});

test('createLinkTag should return a link tag for the given path', t => {
	const filePath = 'file:///var/foo/bar.css';
	t.is('<link rel="stylesheet" href="file:///var/foo/bar.css">', createLinkTag(filePath));
});

// --
// read-file

test('readFile should return the content of a file', t => {
	const gitignoreContent = '.nyc_output\n.vscode\n';
	t.is(gitignoreContent, readFile('.gitignore'));
	t.is(gitignoreContent, readFile('.gitignore', 'windows1252'));
});
