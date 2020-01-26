import { execSync } from 'child_process';
import { resolve } from 'path';
import test from 'ava';

test('should compile the basic example to pdf', async t => {
	const cmd = [
		resolve(__dirname, '..', '..', 'node_modules', '.bin', 'ts-node'), // ts-node binary
		resolve(__dirname, '..', 'cli'), // md-to-pdf cli script (typescript)
		resolve(__dirname, 'basic', 'test.md'), // file to convert
		'--basedir',
		resolve(__dirname, 'basic'),
	].join(' ');

	t.notThrows(() => execSync(cmd));
});
