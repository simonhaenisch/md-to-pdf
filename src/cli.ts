#!/usr/bin/env node

// --
// Packages

import path from 'path';
import arg from 'arg';
import chalk from 'chalk';
import Listr from 'listr';
import getStdin from 'get-stdin';
import getPort from 'get-port';
import { watch } from 'chokidar';

import { help } from './lib/help';
import { serveDirectory, closeServer } from './lib/serve-dir';
import { defaultConfig, Config } from './lib/config';
import { convertMdToPdf } from './lib/md-to-pdf';
import { setProcessAndTermTitle } from './lib/helpers';

// --
// Configure CLI Arguments

const cliFlags = arg({
	'--help': Boolean,
	'--version': Boolean,
	'--basedir': String,
	'--watch': Boolean,
	'--stylesheet': [String],
	'--css': String,
	'--body-class': [String],
	'--highlight-style': String,
	'--marked-options': String,
	'--html-pdf-options': String,
	'--pdf-options': String,
	'--launch-options': String,
	'--port': Number,
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
// Run

main(cliFlags, defaultConfig).catch(error => {
	console.error(error);
	process.exit(1);
});

// --
// Define Main Function

async function main(args: typeof cliFlags, config: Config) {
	setProcessAndTermTitle('md-to-pdf');

	if (args['--version']) {
		return console.log(require('../package').version);
	}

	if (args['--help']) {
		return help();
	}

	/**
	 * 1. Get input.
	 */

	const files = args._;

	const stdin = await getStdin();

	if (files.length === 0 && !stdin) {
		return help();
	}

	/**
	 * 2. Read config file and merge it into the config object.
	 */

	if (args['--config-file']) {
		try {
			const configFile: Partial<Config> = require(path.resolve(args['--config-file']));

			config = {
				...config,
				...configFile,
				pdf_options: { ...config.pdf_options, ...configFile.pdf_options },
			};
		} catch (error) {
			console.warn(chalk.red(`Warning: couldn't read config file: ${args['--config-file']}`));

			if (args['--debug']) {
				console.error(error);
			}
		}
	}

	/**
	 * 3. Start the file server.
	 */

	if (args['--basedir']) {
		config.basedir = args['--basedir'];
	}

	config.port = args['--port'] || (await getPort());

	const server = await serveDirectory(config);

	/**
	 * 4. Either process stdin or create a Listr task for each file.
	 */

	if (stdin) {
		await convertMdToPdf({ content: stdin }, config, args).catch(async (error: Error) => {
			await closeServer(server);

			console.error(error);
			process.exit(1);
		});

		await closeServer(server);

		return;
	}

	const getListrTask = (file: string) => ({
		title: `generating ${args['--as-html'] ? 'HTML' : 'PDF'} from ${chalk.underline(file)}`,
		task: () => convertMdToPdf({ path: file }, config, args),
	});

	await new Listr(files.map(getListrTask), { concurrent: true, exitOnError: false })
		.run()
		.then(() => {
			if (args['--watch']) {
				console.log(chalk.bgBlue('\n watching for changes \n'));

				watch(files).on('change', async file => {
					await new Listr([getListrTask(file)]).run().catch((error: Error) => args['--debug'] && console.error(error));
				});
			} else {
				server.close();
			}
		})
		.catch((error: Error) => (args['--debug'] && console.error(error)) || process.exit(1));
}
