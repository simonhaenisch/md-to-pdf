import chalk from 'chalk';

const helpText = `
  ${chalk.bold('$ md-to-pdf')} [options] path/to/file.md

  ${chalk.dim.underline.bold('Options:')}

    -h, --help ${chalk.dim('...............')} Output usage information
    -v, --version ${chalk.dim('............')} Output version
    -w, --watch ${chalk.dim('..............')} Watch the current file(s) for changes
    --basedir ${chalk.dim('................')} Base directory to be served by the file server
    --stylesheet ${chalk.dim('.............')} Path to a local or remote stylesheet (can be passed multiple times)
    --css ${chalk.dim('....................')} String of styles
    --body-class ${chalk.dim('.............')} Classes to be added to the body tag (can be passed multiple times)
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

    ${chalk.cyan('$ md2pdf file.md')}

  ${chalk.gray('–')} Convert all markdown files in current directory

    ${chalk.cyan('$ md2pdf ./*.md')}

  ${chalk.gray('–')} Convert all markdown files in current directory recursively

    ${chalk.cyan('$ md2pdf ./**/*.md')}

  ${chalk.gray('–')} Convert path/to/file.md with a different base directory

    ${chalk.cyan('$ md2pdf path/to/file.md --basedir path')}

  ${chalk.gray('–')} Convert file.md using custom-markdown.css

    ${chalk.cyan('$ md2pdf file.md --stylesheet custom-markdown.css')}

  ${chalk.gray('–')} Convert file.md using the Monokai theme for code highlighting

    ${chalk.cyan('$ md2pdf file.md --highlight-style monokai')}

  ${chalk.gray('–')} Convert file.md using custom page options

    ${chalk.cyan('$ md2pdf file.md --pdf-options \'{ "format": "Letter" }\'')}

  ${chalk.gray('–')} Convert file.md but save the intermediate HTML instead

    ${chalk.cyan('$ md2pdf file.md --as-html')}
`;

export const help = () => console.log(helpText);
