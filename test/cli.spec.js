const { resolve } = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const test = require('ava');

test('should compile the basic example to pdf', async t => {
	const { stderr } = await exec(`node ${resolve(__dirname, '..', 'cli.js')} ${resolve(__dirname, 'basic', 'test.md')}`);

	t.is(stderr, '');
});
