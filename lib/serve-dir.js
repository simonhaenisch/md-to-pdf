const { createServer } = require('http');
const serveHandler = require('serve-handler');

/**
 * Serve a directory on a random port using a HTTP server and the Serve handler.
 *
 * @param {string} path the directory to be served
 * @param {number} port the port to run the server on
 *
 * @returns a promise that resolves with the server instance once the server is
 * listening
 */
module.exports = (path, port) =>
	new Promise(resolve => {
		const server = createServer((req, res) => serveHandler(req, res, { public: path }));

		server.listen(port, () => resolve(server));
	});
