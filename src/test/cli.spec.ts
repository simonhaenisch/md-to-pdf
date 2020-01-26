import { execSync } from 'child_process';
import { readFileSync, unlinkSync } from 'fs';
import { join, resolve } from 'path';
import test, { before } from 'ava';

before(() => {
	const filesToDelete = [
		resolve(__dirname, 'basic', 'test.pdf'),
		resolve(__dirname, 'nested', 'root.pdf'),
		resolve(__dirname, 'nested', 'level-one', 'one.pdf'),
		resolve(__dirname, 'nested', 'level-one', 'level-two', 'two.pdf'),
	];

	for (const file of filesToDelete) {
		try {
			unlinkSync(file);
		} catch (error) {
			if (error.code !== 'ENOENT') {
				throw error;
			}
		}
	}
});

test('should compile the basic example to pdf using --basedir', async t => {
	t.timeout(15000); // increase the timeout for the CI

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

test('should compile the nested example to pdfs', t => {
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
