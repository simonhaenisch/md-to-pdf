# Markdown to PDF

**A simple CLI tool to convert markdown to pdf**. It uses [marked](https://www.npmjs.com/package/marked) to convert `markdown` to `html` and [html-pdf](https://www.npmjs.com/package/html-pdf) to further convert the `html` to `pdf`. It also uses [highlight.js](https://highlightjs.org) for code highlighting.

## Installation

```sh
git clone https://github.com/simonhaenisch/md-to-pdf
cd md-to-pdf
npm i -g
```

Now the commands `md-to-pdf` and `md2pdf` (just because it's shorter) will be globally available from anywhere in your command line.

## Usage

The first argument is `path/to/file.md` and the second one optionally specifies the `path/to/output.pdf`. If you omit the second argument, it will derive the pdf name from the markdown filename and save it into the same directory that contains the markdown file.

See `md2pdf --help` for CLI arguments and examples.

Paths to images can be relative to the markdown file location (or if they are absolute, they need to use the `file://` protocol).

**Page Break:** Place an element with class `page-break` to force a page break at a certain point of the document, e. g.:

```html
<div class="page-break"></div>
```

For markdown, GFM and tables are enabled by default (see `util/config.js` for default options). The default highlight.js styling for code blocks is `github`. For advanced options see the following links:

* [Marked Advanced Options](https://marked.js.org/#/USING_ADVANCED.md)
* [html-pdf Options](https://github.com/marcbachmann/node-html-pdf#options)
* [highlight.js Styles](https://github.com/isagalaev/highlight.js/tree/master/src/styles)

---

## Customization/Development

You can just start making changes to the files in this repository. NPM 5+ uses symlinks for local global packages, so all changes are reflected immediately without re-installing the package globally. This also means that you can just do a `git pull` to get the latest version onto your machine.

Pull requests are welcome. Just keep it simple! 🤓
