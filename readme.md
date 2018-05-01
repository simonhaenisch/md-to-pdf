# Markdown to PDF

![Screenshot of markdown file and resulting PDF](https://file-eivrbvqdij.now.sh)

**A simple CLI tool to convert markdown to pdf**. It uses [marked](https://www.npmjs.com/package/marked) to convert `markdown` to `html` and [html-pdf](https://www.npmjs.com/package/html-pdf) to further convert the `html` to `pdf`. It also uses [highlight.js](https://highlightjs.org) for code highlighting.

## Installation

```sh
git clone "https://github.com/simonhaenisch/md-to-pdf"
cd md-to-pdf
npm i -g
```

After this, the commands `md-to-pdf` and `md2pdf` (as a shorthand) are globally available in your command line.

## Update

If you already cloned this repository before, you can simply do a `git pull` to pull the latest changes in from the master branch. You don't need to re-install the package because NPM 5+ uses symlinks (at least on Unix systems).

## Usage

```
$ md-to-pdf [options] <path/to/file.md> [path/to/output.pdf]

Options:

  -h, --help               Output usage information
  -v, --version            Output version
  --stylesheet             Set path to a CSS file that will be used for styling
  --highlight-style        Set style to be used by highlight.js (default: github)
  --marked-options         Set custom options for marked (as a JSON string)
  --html-pdf-options       Set custom page options for html-pdf (as a JSON string)
  --md-file-encoding       Set the file encoding for the markdown file
  --stylesheet-encoding    Set the file encoding for the stylesheet
  --config-file            Set path to a configuration file (JSON or JS)
```

The first argument is `path/to/file.md` and the second one optionally specifies the `path/to/output.pdf`. If you omit the second argument, it will derive the pdf name from the markdown filename and save it into the same directory that contains the markdown file. Run `md2pdf --help` for examples on how to use the cli options.

Paths to images can be relative to the markdown file location (or if they are absolute, they need to use the `file://` protocol).

#### Page Break

Place an element with class `page-break` to force a page break at a certain point of the document, e. g.:

```html
<div class="page-break"></div>
```

#### Header/Footer

Place an element with id `pageHeader`/`pageFooter` in your document, e. g.:

```html
<div id="pageHeader">Jane Doe</div>
<div id="pageFooter"><i>Page {{page}} of {{pages}}</i></div>
```

Refer to the [html-pdf docs](https://github.com/marcbachmann/node-html-pdf#footers-and-headers) for more info about headers and footers.

#### Default and Advanced Options

For markdown, GFM and tables are enabled by default (see `util/config.js` for default options). The default highlight.js styling for code blocks is `github`.

For advanced options see the following links:

* [Marked Advanced Options](https://marked.js.org/#/USING_ADVANCED.md)
* [html-pdf Options](https://github.com/marcbachmann/node-html-pdf#options)
* [highlight.js Styles](https://github.com/isagalaev/highlight.js/tree/master/src/styles)

## Options

| Option | Examples |
| - | - |
| `--stylesheet` | `path/to/style.css` |
| `--highlight-style` | `monokai`, `solarized-light` |
| `--marked-options` | `'{"gfm": false }'` |
| `--html-pdf-options` | `'{"format": "Letter", border: "1in" }'` |
| `--md-file-encoding` | `utf-8`, `windows1252` |
| `--stylesheet-encoding` | `utf-8`, `windows1252` |
| `--config-file` | `path/to/config.json` |

Example `config.json`:

```json
{
  "markedOptions": {
    "headerIds": false,
    "smartypants": true,
  },
  "htmlPdfOptions": {
    "format": "A5",
    "border": "10mm"
  },
  "highlightStyle": "monokai",
  "stylesheet": "path/to/style.css",
  "defaultEncoding": "utf-8"
  }
}
```

## Customization/Development

You can just start making changes to the files in this repository. NPM 5+ uses symlinks for local global packages, so all changes are reflected immediately without re-installing the package globally. This also means that you can just do a `git pull` to get the latest version onto your machine.

Pull requests are welcome. Just keep it simple! 🤓
