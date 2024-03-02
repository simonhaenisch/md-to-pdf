// debugRunner.js
const { glob } = require('glob');
const { execSync } = require('child_process');

const pattern = 'readme.md';

const files = glob.sync(pattern);
if (files.length === 0) {
    console.error('No Markdown files found.');
    return;
}
console.log("test2");
files.forEach(file => {
    console.log(`Processing ${file}...`);
    execSync(`ts-node src/cli.ts "${file}"`, { stdio: 'inherit' });
});
