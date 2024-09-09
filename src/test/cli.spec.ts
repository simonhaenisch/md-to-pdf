import test, { beforeEach } from 'ava';
import { execSync } from 'child_process';
import { readFileSync, unlinkSync } from 'fs';
import { join, resolve } from 'path';

beforeEach(() => {
	const filesToDelete = [
		resolve(__dirname, 'basic', 'test.pdf'),
		resolve(__dirname, 'basic', 'test-stdio.pdf'),
		resolve(__dirname, 'nested', 'root.pdf'),
		resolve(__dirname, 'nested', 'level-one', 'one.pdf'),
		resolve(__dirname, 'nested', 'level-one', 'level-two', 'two.pdf'),
	];

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

test('compile the basic example to pdf using --basedir', (t) => {
	const cmd = [
		resolve(__dirname, '..', '..', 'node_modules', '.bin', 'ts-node'), // ts-node binary
		resolve(__dirname, '..', 'cli'), // md-to-pdf cli script (typescript)
		resolve(__dirname, 'basic', 'test.md'), // file to convert
		'--basedir',
		resolve(__dirname, 'basic'),
	].join(' ');

	t.notThrows(() => execSync(cmd));

	t.notThrows(() => readFileSync(resolve(__dirname, 'basic', 'test.pdf'), 'utf-8'));
});

test('compile the basic example to pdf using --markdown-parser markdown-it', (t) => {
	const cmd = [
		resolve(__dirname, '..', '..', 'node_modules', '.bin', 'ts-node'), // ts-node binary
		resolve(__dirname, '..', 'cli'), // md-to-pdf cli script (typescript)
		resolve(__dirname, 'basic', 'test.md'), // file to convert
		'--markdown-parser',
		'markdown-it',
	].join(' ');

	t.notThrows(() => execSync(cmd));

	t.notThrows(() => readFileSync(resolve(__dirname, 'basic', 'test.pdf'), 'utf-8'));
});

test('compile the basic example using stdio', (t) => {
	const cmd = [
		'cat',
		resolve(__dirname, 'basic', 'test.md'), // file to convert
		'|',
		resolve(__dirname, '..', '..', 'node_modules', '.bin', 'ts-node'), // ts-node binary
		resolve(__dirname, '..', 'cli'), // md-to-pdf cli script (typescript)
		'--basedir',
		resolve(__dirname, 'basic'),
		'>',
		resolve(__dirname, 'basic', 'test-stdio.pdf'),
	].join(' ');

	t.notThrows(() => execSync(cmd));

	t.notThrows(() => readFileSync(resolve(__dirname, 'basic', 'test-stdio.pdf'), 'utf-8'));
});

test('compile the nested example to pdfs', (t) => {
	const cmd = [
		resolve(__dirname, '..', '..', 'node_modules', '.bin', 'ts-node'), // ts-node binary
		resolve(__dirname, '..', 'cli'), // md-to-pdf cli script (typescript)
		'root.md', // files to convert
		join('level-one', 'one.md'),
		join('level-one', 'level-two', 'two.md'),
	].join(' ');

	t.notThrows(() => execSync(cmd, { cwd: resolve(__dirname, 'nested') }));

	t.notThrows(() => readFileSync(resolve(__dirname, 'nested', 'root.pdf'), 'utf-8'));
	t.notThrows(() => readFileSync(resolve(__dirname, 'nested', 'level-one', 'one.pdf'), 'utf-8'));
	t.notThrows(() => readFileSync(resolve(__dirname, 'nested', 'level-one', 'level-two', 'two.pdf'), 'utf-8'));
});

test('compile with a marked extension', (t) => {
	const cmd = [
		resolve(__dirname, '..', '..', 'node_modules', '.bin', 'ts-node'), // ts-node binary
		resolve(__dirname, '..', 'cli'), // md-to-pdf cli script (typescript)
		resolve(__dirname, 'marked-extensions', 'doc.md'), // file to convert
		'--config-file',
		resolve(__dirname, 'marked-extensions', 'config.js'),
	].join(' ');

	t.notThrows(() => execSync(cmd));

	t.notThrows(() => readFileSync(resolve(__dirname, 'basic', 'test.pdf'), 'utf-8'));
});

test('compile with a markdown-it extension', (t) => {
	const cmd = [
		resolve(__dirname, '..', '..', 'node_modules', '.bin', 'ts-node'), // ts-node binary
		resolve(__dirname, '..', 'cli'), // md-to-pdf cli script (typescript)
		resolve(__dirname, 'markdown-it-extensions', 'doc.md'), // file to convert
		'--config-file',
		resolve(__dirname, 'markdown-it-extensions', 'config.js'),
	].join(' ');

	t.notThrows(() => execSync(cmd));

	t.notThrows(() => readFileSync(resolve(__dirname, 'basic', 'test.pdf'), 'utf-8'));
});

test('invalid markdown parser detected', (t) => {
	const cmd = [
		resolve(__dirname, '..', '..', 'node_modules', '.bin', 'ts-node'), // ts-node binary
		resolve(__dirname, '..', 'cli'), // md-to-pdf cli script (typescript)
		resolve(__dirname, 'basic', 'test.md'), // file to convert
		'--markdown-parser',
		'not_a_real_parser',
	].join(' ');

	t.throws(() => execSync(cmd));
});
