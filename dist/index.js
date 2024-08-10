"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.info = exports.exit = exports.init = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const MODULE_NAME = '[sillyTavern-sd-plugin]';
function getBasicAuthHeader(auth) {
    const encoded = Buffer.from(`${auth}`).toString('base64');
    return `Basic ${encoded}`;
}
/**
 * Initialize the plugin.
 * @param router Express Router
 */
function init(router) {
    return __awaiter(this, void 0, void 0, function* () {
        const jsonParser = body_parser_1.default.json();
        // Used to check if the server plugin is running
        router.post('/probe', (_req, res) => {
            return res.sendStatus(204);
        });
        // Use body-parser to parse the request body
        router.post('/ping', jsonParser, (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { message } = req.body;
                return res.json({ message: `Pong! ${message}` });
            }
            catch (error) {
                console.error(MODULE_NAME, 'Request failed', error);
                return res.status(500).send('Internal Server Error');
            }
        }));
        //added @vincedundee
        router.post('/vaes', jsonParser, (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const url = new URL(request.body.url);
                url.pathname = '/sdapi/v1/sd-vae';
                const result = yield fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: getBasicAuthHeader(request.body.auth),
                    },
                });
                if (!result.ok) {
                    throw new Error('SD WebUI returned an error.');
                }
                const data = yield result.json();
                return response.send(data);
            }
            catch (error) {
                console.log(error);
                return response.sendStatus(500);
            }
        }));
        //added @vincedundee
        router.post('/loras', jsonParser, (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const url = new URL(request.body.url);
                url.pathname = '/sdapi/v1/loras';
                const result = yield fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: getBasicAuthHeader(request.body.auth),
                    },
                });
                if (!result.ok) {
                    throw new Error('SD WebUI returned an error.');
                }
                const data = yield result.json();
                return response.send(data);
            }
            catch (error) {
                console.log(error);
                return response.sendStatus(500);
            }
        }));
        //added @vincedundee
        router.post('/controlnet/model_list', jsonParser, (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const url = new URL(request.body.url);
                url.pathname = '/controlnet/model_list';
                const result = yield fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: getBasicAuthHeader(request.body.auth),
                    },
                });
                if (!result.ok) {
                    throw new Error('SD WebUI returned an error.');
                }
                const data = yield result.json();
                return response.send(data);
            }
            catch (error) {
                console.log(error);
                return response.sendStatus(500);
            }
        }));
        //added @vincedundee
        router.post('/controlnet/modules_list', jsonParser, (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const url = new URL(request.body.url);
                url.pathname = '/controlnet/module_list';
                const result = yield fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: getBasicAuthHeader(request.body.auth),
                    },
                });
                if (!result.ok) {
                    throw new Error('SD WebUI returned an error.');
                }
                const data = yield result.json();
                return response.send(data);
            }
            catch (error) {
                console.log(error);
                return response.sendStatus(500);
            }
        }));
        //controlnet/control_types
        router.post('/controlnet/types', jsonParser, (request, response) => __awaiter(this, void 0, void 0, function* () {
            try {
                const url = new URL(request.body.url);
                url.pathname = '/controlnet/control_types';
                const result = yield fetch(url, {
                    method: 'GET',
                    headers: {
                        Authorization: getBasicAuthHeader(request.body.auth),
                    },
                });
                if (!result.ok) {
                    throw new Error('SD WebUI returned an error.');
                }
                const data = yield result.json();
                return response.send(data);
            }
            catch (error) {
                console.log(error);
                return response.sendStatus(500);
            }
        }));
        console.log(MODULE_NAME, 'Plugin loaded!');
    });
}
exports.init = init;
function exit() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(MODULE_NAME, 'Plugin exited');
    });
}
exports.exit = exit;
exports.info = {
    id: 'stwebui',
    name: 'Server Plugin for Silly Tavern Alternative SD Plugin',
    description: 'Allows additional SD Forge/A1111 API endpoints to be used',
};
const plugin = {
    init,
    exit,
    info: exports.info,
};
exports.default = plugin;
//# sourceMappingURL=index.js.map