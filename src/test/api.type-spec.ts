import { expectType } from 'tsd';
import { mdToPdf } from '..';
import { HtmlOutput, PdfOutput } from '../lib/generate-output';

(async () => {
	expectType<PdfOutput>(await mdToPdf({ content: 'foo' }));
	expectType<PdfOutput>(await mdToPdf({ path: 'foo.md' }));

	expectType<PdfOutput>(await mdToPdf({ path: 'foo.md' }, { as_html: false }));
	expectType<PdfOutput>(await mdToPdf({ content: 'foo' }, { launch_options: { args: ['--no-sandbox'] } }));

	expectType<HtmlOutput>(await mdToPdf({ content: 'foo' }, { as_html: true }));
	expectType<HtmlOutput>(await mdToPdf({ path: 'foo.md' }, { as_html: true }));
})();
