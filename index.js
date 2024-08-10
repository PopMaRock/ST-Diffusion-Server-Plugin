import express from 'express';

const jsonParser = express.json({ limit: '200mb' });

const MODULE_NAME = '[sillyTavern-sd-plugin]';

function getBasicAuthHeader(auth) {
    const encoded = Buffer.from(`${auth}`).toString('base64');
    return `Basic ${encoded}`;
}
/**
 * Initialize the plugin.
 * @param router Express Router
 */
export async function init(router) {
    // Used to check if the server plugin is running
    router.post('/probe', (_req, res) => {
        return res.sendStatus(204);
    });
    // Use body-parser to parse the request body
    router.post('/ping', jsonParser, async (req, res) => {
        try {
            const { message } = req.body;
            return res.json({ message: `Pong! ${message}` });
        } catch (error) {
            console.error((MODULE_NAME), 'Request failed', error);
            return res.status(500).send('Internal Server Error');
        }
    });
    //added @vincedundee
    router.post('/vaes', jsonParser, async (request, response) => {
        try {
            const url = new URL(request.body.url);
            url.pathname = '/sdapi/v1/sd-vae';

            const result = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: getBasicAuthHeader(request.body.auth),
                },
            });

            if (!result.ok) {
                throw new Error('SD WebUI returned an error.');
            }

            const data = await result.json();
            return response.send(data);
        } catch (error) {
            console.log(error);
            return response.sendStatus(500);
        }
    });
    //added @vincedundee
    router.post('/loras', jsonParser, async (request, response) => {
        try {
            const url = new URL(request.body.url);
            url.pathname = '/sdapi/v1/loras';

            const result = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: getBasicAuthHeader(request.body.auth),
                },
            });

            if (!result.ok) {
                throw new Error('SD WebUI returned an error.');
            }

            const data = await result.json();
            return response.send(data);
        } catch (error) {
            console.log(error);
            return response.sendStatus(500);
        }
    });
    //added @vincedundee
    router.post(
        '/controlnet/model_list',
        jsonParser,
        async (request, response) => {
            try {
                const url = new URL(request.body.url);
                url.pathname = '/controlnet/model_list';

                const result = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: getBasicAuthHeader(request.body.auth),
                    },
                });

                if (!result.ok) {
                    throw new Error('SD WebUI returned an error.');
                }

                const data = await result.json();
                return response.send(data);
            } catch (error) {
                console.log(error);
                return response.sendStatus(500);
            }
        },
    );
    //added @vincedundee
    router.post(
        '/controlnet/modules_list',
        jsonParser,
        async (request, response) => {
            try {
                const url = new URL(request.body.url);
                url.pathname = '/controlnet/module_list';

                const result = await fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: getBasicAuthHeader(request.body.auth),
                    },
                });

                if (!result.ok) {
                    throw new Error('SD WebUI returned an error.');
                }

                const data = await result.json();
                return response.send(data);
            } catch (error) {
                console.log(error);
                return response.sendStatus(500);
            }
        },
    );
    //controlnet/control_types
    router.post('/controlnet/types', jsonParser, async (request, response) => {
        try {
            const url = new URL(request.body.url);
            url.pathname = '/controlnet/control_types';

            const result = await fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: getBasicAuthHeader(request.body.auth),
                },
            });

            if (!result.ok) {
                throw new Error('SD WebUI returned an error.');
            }

            const data = await result.json();
            return response.send(data);
        } catch (error) {
            console.log(error);
            return response.sendStatus(500);
        }
    });

    console.log(chalk.green(MODULE_NAME), 'Plugin loaded!');
}

export async function exit() {
    console.log(chalk.yellow(MODULE_NAME), 'Plugin exited');
}

export const info = {
    id: 'stwebui',
    name: 'Server Plugin for Silly Tavern Alternative SD Plugin',
    description: 'Allows additional SD Forge/A1111 API endpoints to be used',
};

const plugin = {
    init,
    exit,
    info,
};

export default plugin;
