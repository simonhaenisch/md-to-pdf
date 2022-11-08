import { CliArgs, Config } from '../lib/config';
import { convertMdToPdf } from '../lib/md-to-pdf';

export default async function handleStdin(stdin: string, config: Config, args: CliArgs) {
	await convertMdToPdf({ content: stdin }, config, args).catch((error: Error) => {
		throw error;
	});
}
