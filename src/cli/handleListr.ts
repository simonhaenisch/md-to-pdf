import chalk from 'chalk';
import { FSWatcher, watch, WatchOptions } from 'chokidar';
import Listr from 'listr';
import { CliArgs, Config } from '../lib/config';
import { isMdFile } from '../lib/is-md-file';
import { convertMdToPdf } from '../lib/md-to-pdf';

type OutputFileType = 'HTML' | 'PDF';

export default async function handleListr(watchPath: string[], config: Config, args: CliArgs): Promise<void> {
	const withWatch = args['--watch'];
	const watchOptions = args['--watch-options']
		? (JSON.parse(args['--watch-options']) as WatchOptions)
		: config.watch_options;
	const outputType: OutputFileType = args['--as-html'] ? 'HTML' : 'PDF';

	const watcher = watch(watchPath, watchOptions);
	if (watchPath.length > 1) {
		await legacyListrHandler(watchPath, outputType, watcher, config, args, withWatch);
	} else {
		await handleSinglePath(watcher, outputType, config, args, withWatch);
	}
	await watcher.close();
	return;
}

const createListrTask = (file: string, outputType: OutputFileType, config: Config, args: CliArgs): Listr.ListrTask => ({
	title: `generating ${outputType} from ${chalk.underline(file)}`,
	task: () => convertMdToPdf({ path: file }, config, args),
});

const createAndRunListr = async (pathSet: Set<string>, outputType: OutputFileType, config: Config, args: CliArgs) => {
	try {
		await new Listr(
			Array.from(pathSet).map((path) => createListrTask(path, outputType, config, args)),
			{ concurrent: true, exitOnError: false },
		).run();
	} catch (error) {
		console.error(error);
	}
};

const handleSinglePath = async (
	watcher: FSWatcher,
	outputType: OutputFileType,
	config: Config,
	args: CliArgs,
	withWatch = false,
) => {
	/*
	 * Run initial watch and listen for 'add' events.
	 */
	await new Promise<void>(async (resolve) => {
		const pathSet: Set<string> = new Set<string>();
		watcher.on('add', (path) => {
			if (!isMdFile(path)) return;
			pathSet.add(path);
		});
		watcher.on('ready', async () => {
			await createAndRunListr(pathSet, outputType, config, args);
			resolve();
		});
	});

	if (!withWatch) {
		return;
	}

	/*
	 * Setup for running with --watch
	 */
	const pathSet: Set<string> = new Set<string>();
	const timeOut = setTimeout(() => {
		createAndRunListr(pathSet, outputType, config, args);
		pathSet.clear();
	}, config.watch_timeout);

	const addOrChangeCallback = (path: string) => {
		if (!isMdFile(path)) return;

		pathSet.add(path);
		timeOut.refresh();
	};

	console.log(chalk.bgBlue(`\n watching for changes with ${config.watch_timeout} ms watch_timeout \n`));
	watcher.removeAllListeners();
	watcher
		.on('add', addOrChangeCallback)
		.on('change', addOrChangeCallback)
		.on('error', (error) => console.error(error));

	/*
	 * Keep this function open, until the programm gets exit code.
	 */
	return new Promise<void>(() => null);
};

const legacyListrHandler = async (
	files: string[],
	outputType: OutputFileType,
	watcher: FSWatcher,
	config: Config,
	args: CliArgs,
	withWatch = false,
) => {
	return await new Listr(
		files.map((path) => createListrTask(path, outputType, config, args)),
		{ concurrent: true, exitOnError: false },
	)
		.run()
		.then(async () => {
			if (withWatch) {
				console.log(chalk.bgBlue('\n watching for changes \n'));

				watcher.on('change', async (file) =>
					new Listr([createListrTask(file, outputType, config, args)], { exitOnError: false })
						.run()
						.catch(console.error),
				);

				return new Promise<void>(() => null);
			}
		})
		.catch((error: Error) => {
			/**
			 * In watch mode the error needs to be shown immediately because the `main` function's catch handler will never execute.
			 *
			 * @todo is this correct or does `main` actually finish and the process is just kept alive because of the file server?
			 */
			if (withWatch) {
				return console.error(error);
			}

			throw error;
		});
};
