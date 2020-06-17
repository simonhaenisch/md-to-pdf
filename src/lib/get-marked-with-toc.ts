import marked from 'marked';
import { Config } from './config';

// eslint-disable-next-line import/no-mutable-exports
export let toc: TableOfContent[] = [];
export const getHeadingRenderer = (config: Config) => {
	toc = [];
	const options = config.marked_options;
	const renderer = options.renderer ?? new marked.Renderer();

	// only add if the renderer has no custom `headings` property yet
	if (!Object.prototype.hasOwnProperty.call(renderer, 'heading')) {
		renderer.heading = (text: string, level: number, raw: string) => {
			const anchor = `${options.headerPrefix ?? ''}${raw.toLowerCase().replace(/\W+/g, '-')}`;
			toc.push({
				anchor,
				level,
				text,
			});

			return `<h${level} id="${anchor}">${text}</h${level}>\n`;
		};
	}

	return { renderer };
};

export interface TableOfContent {
	anchor: string;
	level: number;
	text: string;
}
