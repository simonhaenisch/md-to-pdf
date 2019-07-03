#!/usr/bin/env node

// --
// Packages

import path from 'path';
import arg from 'arg';
import chalk from 'chalk';
import Listr from 'listr';
import getPort from 'get-port';
import { watch } from 'chokidar';

import { help } from './lib/help';
import { getMdFilesInDir } from './lib/get-md-files-in-dir';
import { serveDirectory } from './lib/serve-dir';
import { defaultConfig, Config } from './lib/config';
import { getDir } from './lib/helpers';
import { convertMdToPdf } from './lib/md-to-pdf';

// --
// Configure CLI Arguments

const cliFlags = arg({
	'--help': Boolean,
	'--version': Boolean,
	'--watch': Boolean,
	'--stylesheet': [String],
	'--css': String,
	'--body-class': [String],
	'--highlight-style': String,
	'--marked-options': String,
	'--html-pdf-options': String,
	'--pdf-options': String,
	'--launch-options': String,
	'--md-file-encoding': String,
	'--stylesheet-encoding': String,
	'--as-html': Boolean,
	'--config-file': String,
	'--devtools': Boolean,
	'--debug': Boolean,

	// aliases
	'-h': '--help',
	'-v': '--version',
	'-w': '--watch',
});

// --
// Main

async function main(args: typeof cliFlags, config: Config) {
	if (args['--version']) {
		return console.log(require('./package').version);
	}

	if (args['--help']) {
		return help();
	}

	/**
	 * throw warning when using --html-pdf-options flag
	 * @todo remove in a future version
	 */
	if (args['--html-pdf-options']) {
		console.warn(
			[
				chalk.red(`--html-pdf-options is not a valid argument anymore. Use --pdf-options instead.`),
				chalk.gray(`valid options: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagepdfoptions`),
			].join('\n'),
		);
	}

	const [input, dest] = args._;

	const mdFiles = input ? [input] : await getMdFilesInDir('.');

	if (mdFiles.length === 0) {
		return help();
	}

	if (dest) {
		config.dest = dest;
	}

	// merge config from config file
	if (args['--config-file']) {
		try {
			config = { ...config, ...require(path.resolve(args['--config-file'])) };
		} catch (error) {
			console.warn(chalk.red(`Warning: couldn't read config file: ${args['--config-file']}`));

			if (args['--debug']) {
				console.error(error);
			}
		}
	}

	// serve directory of first file because all files will be in the same dir
	const port = await getPort();
	const server = await serveDirectory(getDir(mdFiles[0]), port);

	const getListrTask = (mdFile: string) => ({
		title: `generating ${args['--as-html'] ? 'HTML' : 'PDF'} from ${chalk.underline(mdFile)}`,
		task: () => convertMdToPdf(mdFile, config, port, args),
	});

	// create list of tasks and run concurrently
	await new Listr(mdFiles.map(getListrTask), { concurrent: true, exitOnError: false })
		.run()
		.then(() => {
			if (args['--watch']) {
				console.log(chalk.bgBlue('\n watching for changes \n'));

				watch(mdFiles).on('change', async mdFile => {
					await new Listr([getListrTask(mdFile)])
						.run()
						.catch((error: Error) => args['--debug'] && console.error(error));
				});
			} else {
				server.close();
			}
		})
		.catch((error: Error) => (args['--debug'] && console.error(error)) || process.exit(1));
}

// --
// Run

main(cliFlags, defaultConfig).catch(error => {
	console.error(error);
	process.exit(1);
});
