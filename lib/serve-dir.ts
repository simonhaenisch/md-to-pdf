import { createServer, Server } from 'http';
import serveHandler from 'serve-handler';

/**
 * Serve a directory on a random port using a HTTP server and the Serve handler.
 *
 * @returns a promise that resolves with the server instance once the server is ready and listening.
 */
export const serveDirectory = async (path: string, port: number) =>
	new Promise<Server>(resolve => {
		const server = createServer((req, res) => serveHandler(req, res, { public: path }));

		server.listen(port, () => resolve(server));
	});
