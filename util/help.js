const chalk = require('chalk');

const help = `
  ${chalk.bold('$ md-to-pdf')} [options] [path/to/file.md] [path/to/output.pdf]

  ${chalk.dim('Options:')}

    -h, --help              Output usage information
    -v, --version           Output version
    -w, --watch             Watch the current file(s) for changes
    --stylesheet            Path to a local or remote stylesheet (can be passed multiple times)
    --css                   String of styles (can be used to overwrite stylesheets)
    --body-class            Classes to be added to the body tag (can be passed multiple times)
    --highlight-style       Style to be used by highlight.js (default: github)
    --marked-options        Set custom options for marked (as a JSON string)
    --pdf-options           Set custom options for the generated PDF (as a JSON string)
    --md-file-encoding      Set the file encoding for the markdown file
    --stylesheet-encoding   Set the file encoding for the stylesheet
    --config-file           Path to a JSON or JS configuration file
    --devtools              Open the browser with devtools instead of creating PDF
    --debug                 Show more output on errors

  ${chalk.dim('Examples:')}

  ${chalk.gray('–')} Convert all markdown files in current directory

    ${chalk.cyan('$ md2pdf')}

  ${chalk.gray('–')} Convert ./file.md and save to ./file.pdf

    ${chalk.cyan('$ md2pdf file.md')}

  ${chalk.gray('–')} Convert file.md and save to ~/Documents/file.pdf

    ${chalk.cyan('$ md2pdf file.md ~/Documents/file.pdf')}

  ${chalk.gray('–')} Convert path/to/file.md and save to path/to/file.pdf

    ${chalk.cyan('$ md2pdf path/to/file.md')}

  ${chalk.gray('–')} Convert file.md using custom-markdown.css

    ${chalk.cyan('$ md2pdf file.md --stylesheet custom-markdown.css')}

  ${chalk.gray('–')} Convert file.md using the Monokai theme for code highlighting

    ${chalk.cyan('$ md2pdf file.md --highlight-style monokai')}

  ${chalk.gray('–')} Convert file.md using custom page options

    ${chalk.cyan('$ md2pdf file.md --pdf-options \'{ "format": "Letter", "margin": null }\'')}
`;

module.exports = () => console.log(help);
