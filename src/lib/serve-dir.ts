import { createServer, Server } from 'http';
import serveHandler from 'serve-handler';
import { Config } from './config';

/**
 * Serve a directory on a random port using a HTTP server and the serve-handler package.
 *
 * @returns a promise that resolves with the server instance once the server is ready and listening.
 */
export const serveDirectory = async ({ basedir, port }: Config) =>
	new Promise<Server>((resolve) => {
		const server = createServer(async (request, response) => serveHandler(request, response, { public: basedir }));

		server.listen(port, () => resolve(server));
	});

/**
 * Close the given server instance asynchronously.
 */
export const closeServer = async (server: Server) =>
	new Promise<void>((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
