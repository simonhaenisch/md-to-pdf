#!/usr/bin/env node

// --
// Packages

// Done
// Makes dictionary of each chapter's md files
// Have a function that turns an array of md files into a pdfs in that dir

// To do
// Have each chapter's pdfs created

// Possible appproaches
// 1: WINNER!!
// Make pdf at each file location, then go through and specify each location to pdfunite
// Generate all the chapter's pdfs
// Unite chapter pdfs
// Delete indivdual pdfs (maybe see if pdfunite can do this for us)
// Pros:
// Follows the generate-output logic
// Cons:
// Puts files everywhere

// 2
// Put all pdfs in root dir
// Pros:
// Easy to implement pdfunite
// Cons:
// Have to change generate-output logic
// 

//TO DO 
// pdfunite does not like it when there's spaces in the file name. It works for the other test cases so figure that out.

import arg from 'arg';
import chalk from 'chalk';
import { watch, WatchOptions } from 'chokidar';
import getPort from 'get-port';
// import getStdin from 'get-stdin';
import Listr from 'listr';
import path from 'path';
import { PackageJson } from '.';
import { Config, defaultConfig } from './lib/config';
import { closeBrowser } from './lib/generate-output';
import { help } from './lib/help';
import { convertMdToPdf } from './lib/md-to-pdf';
import { closeServer, serveDirectory } from './lib/serve-dir';
import { validateNodeVersion } from './lib/validate-node-version';
import { exec as execCallback } from 'child_process';
import * as fs from 'fs/promises';
import { promisify } from 'util';
const exec = promisify(execCallback);
import {mergeFiles} from './lib/merge-files';




// --
// Configure CLI Arguments

export const cliFlags = arg({
	'--help': Boolean,
	'--version': Boolean,
	'--basedir': String,
	'--watch': Boolean,
	'--watch-options': String,
	'--stylesheet': [String],
	'--css': String,
	'--document-title': String,
	'--body-class': [String],
	'--page-media-type': String,
	'--highlight-style': String,
	'--marked-options': String,
	'--html-pdf-options': String,
	'--pdf-options': String,
	'--launch-options': String,
	'--gray-matter-options': String,
	'--port': Number,
	'--md-file-encoding': String,
	'--stylesheet-encoding': String,
	'--as-html': Boolean,
	'--config-file': String,
	'--devtools': Boolean,
	
	'--book': String,

	// aliases
	'-h': '--help',
	'-v': '--version',
	'-w': '--watch',
});

// --
// Run

main(cliFlags, defaultConfig).catch((error) => {
	console.error(error);
	process.exit(1);
});

// --
// Define Main Function

async function main(args: typeof cliFlags, config: Config) {
	process.title = 'md-to-pdf';

	if (!validateNodeVersion()) {
		throw new Error('Please use a Node.js version that satisfies the version specified in the engines field.');
	}

	if (args['--version']) {
		console.log("lollolll");
		return console.log((require('../package.json') as PackageJson).version);
	}

    if (args['--book']) {
		config.port = args['--port'] ?? (await getPort());
		const server = await serveDirectory(config);

        await mergeFiles(args, config);
        return;
    }		

	if (args['--help']) {
		return help();
	}

	/**
	 * 1. Get input.
	 */

	const files = args._;
	
	// const stdin = await getStdin();
	const stdin = false;
	
	// if (files.length === 0 && !stdin) {
	// 	return help();
	// }
	
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
			console.warn(chalk.red(`Warning: couldn't read config file: ${path.resolve(args['--config-file'])}`));
			console.warn(error instanceof SyntaxError ? error.message : error);
		}
	}
	
	/**
	 * 3. Start the file server.
	*/
	
	if (args['--basedir']) {
		config.basedir = args['--basedir'];
	}
	
	config.port = args['--port'] ?? (await getPort());
	
	const server = await serveDirectory(config);
	
	
	/**
	 * 4. Either process stdin or create a Listr task for each file.
	*/
	


	

	if (stdin) {
		await convertMdToPdf({ content: stdin }, config, { args })
		.finally(async () => {
			await closeBrowser();
			await closeServer(server);
		})
		.catch((error: Error) => {
			throw error;
		});

		return;
	}

	//should be able to get rid of this with generatePdfs()
	// TODO

	// let files: string[] = ['/Users/log/Github/md-to-pdf/src/test/nested'];
	const getListrTask = (file: string) => ({
		title: `generating ${args['--as-html'] ? 'HTML' : 'PDF'} from ${chalk.underline(file)}`,
		task: async () => convertMdToPdf({ path: file }, config, { args }),
	});

	await new Listr(files.map(getListrTask), { concurrent: true, exitOnError: false })
		.run()
		.then(async () => {
			if (args['--watch']) {
				console.log(chalk.bgBlue('\n watching for changes \n'));

				const watchOptions = args['--watch-options']
					? (JSON.parse(args['--watch-options']) as WatchOptions)
					: config.watch_options;

				watch(files, watchOptions).on('change', async (file) =>
					new Listr([getListrTask(file)], { exitOnError: false }).run().catch(console.error),
				);
			} else {
				await closeBrowser();
				await closeServer(server);
			}
		})
		.catch((error: Error) => {
			/**
			 * In watch mode the error needs to be shown immediately because the `main` function's catch handler will never execute.
			 *
			 * @todo is this correct or does `main` actually finish and the process is just kept alive because of the file server?
			 */
			if (args['--watch']) {
				return console.error(error);
			}

			throw error;
		});
}