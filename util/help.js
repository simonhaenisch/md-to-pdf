const chalk = require('chalk');

const help = `
  ${chalk.bold('$ markdown-to-pdf')} [options] <path/to/file.md> [path/to/output.pdf]

  ${chalk.dim('Options:')}

    -h, --help               Output usage information
    -v, --version            Output version
    --stylesheet             Set path to a CSS file that will be used for styling
    --highlight-style        Set style to be used by highlight.js (default: github)
    --marked-options         Set custom options for marked (as a JSON string)
    --html-pdf-options       Set custom page options for html-pdf (as a JSON string)
    --md-file-encoding       Set the file encoding for the markdown file
    --stylesheet-encoding    Set the file encoding for the stylesheet

  ${chalk.dim('Examples:')}

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

    ${chalk.cyan('$ md2pdf file.md --html-pdf-options \'{ "format": "letter", "border": "1in" }\'')}
`;

module.exports = () => console.log(help);
