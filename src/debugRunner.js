// debugger
const { execSync } = require('child_process');

const fileOrDirectory = 'src/test/nested'; // Direct path to your Markdown file or directory

console.log(`Processing ${fileOrDirectory}...`);

try {
    execSync(`ts-node src/cli.ts --book "${fileOrDirectory}"`, { stdio: 'inherit', shell: true });
} catch (error) {
    console.error('Error executing md-to-pdf:', error);
    console.error('Stderr:', error.stderr?.toString());
    process.exit(1); // Exit with an error code to signal failure
}
