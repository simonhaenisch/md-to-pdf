import chalk from 'chalk';

const helpText = `
  ${chalk.bold('$ md-to-pdf')} [options] path/to/file.md

  ${chalk.dim.underline.bold('Options:')}

    -h, --help ${chalk.dim('...............')} Output usage information
    -v, --version ${chalk.dim('............')} Output version
    -w, --watch ${chalk.dim('..............')} Watch the current file(s) for changes
		--watch-options ${chalk.dim('..........')} Options for Chokidar's watch call
    --basedir ${chalk.dim('................')} Base directory to be served by the file server
    --stylesheet ${chalk.dim('.............')} Path to a local or remote stylesheet (can be passed multiple times)
    --css ${chalk.dim('....................')} String of styles
    --document-title ${chalk.dim('.........')} Name of the HTML Document.
    --body-class ${chalk.dim('.............')} Classes to be added to the body tag (can be passed multiple times)
    --page-media-type ${chalk.dim('........')} Media type to emulate the page with (default: screen)
    --highlight-style ${chalk.dim('........')} Style to be used by highlight.js (default: github)
    --marked-options ${chalk.dim('.........')} Set custom options for marked (as a JSON string)
    --pdf-options ${chalk.dim('............')} Set custom options for the generated PDF (as a JSON string)
    --launch-options ${chalk.dim('.........')} Set custom launch options for Puppeteer
    --port ${chalk.dim('...................')} Set the port to run the http server on
    --md-file-encoding ${chalk.dim('.......')} Set the file encoding for the markdown file
    --stylesheet-encoding ${chalk.dim('....')} Set the file encoding for the stylesheet
    --as-html ${chalk.dim('................')} Output as HTML instead
    --config-file ${chalk.dim('............')} Path to a JSON or JS configuration file
    --devtools ${chalk.dim('...............')} Open the browser with devtools instead of creating PDF

  ${chalk.dim.underline.bold('Examples:')}

  ${chalk.gray('–')} Convert ./file.md and save to ./file.pdf

    ${chalk.cyan('$ md-to-pdf file.md')}

  ${chalk.gray('–')} Convert all markdown files in current directory

    ${chalk.cyan('$ md-to-pdf ./*.md')}

  ${chalk.gray('–')} Convert all markdown files in current directory recursively

    ${chalk.cyan('$ md-to-pdf ./**/*.md')}

  ${chalk.gray('–')} Convert and enable watch mode

    ${chalk.cyan('$ md-to-pdf ./*.md -w')}

  ${chalk.gray('–')} Convert and enable watch mode with custom options

    ${chalk.cyan('$ md-to-pdf ./*.md --watch --watch-options \'{ "atomic": true }\'')}

  ${chalk.gray('–')} Convert path/to/file.md with a different base directory

    ${chalk.cyan('$ md-to-pdf path/to/file.md --basedir path')}

  ${chalk.gray('–')} Convert file.md using custom-markdown.css

    ${chalk.cyan('$ md-to-pdf file.md --stylesheet custom-markdown.css')}

  ${chalk.gray('–')} Convert file.md using the Monokai theme for code highlighting

    ${chalk.cyan('$ md-to-pdf file.md --highlight-style monokai')}

  ${chalk.gray('–')} Convert file.md using custom page options

    ${chalk.cyan('$ md-to-pdf file.md --pdf-options \'{ "format": "Letter" }\'')}

  ${chalk.gray('–')} Convert file.md but save the intermediate HTML instead

    ${chalk.cyan('$ md-to-pdf file.md --as-html')}
`;

export const help = () => console.log(helpText);
