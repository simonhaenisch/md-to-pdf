import { ConvertFactory } from '../lib/md-to-pdf';

export default async function handleStdin(content: string, convertFactory: ConvertFactory) {
	await convertFactory({ content }).catch((error: Error) => {
		throw error;
	});
}
