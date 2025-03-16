import { IncomingMessage, ServerResponse } from "http";

import { SendMessageHandler } from "~/Handler/SendMessageHandler";
import {Handlers} from "~/Handler/Handlers";

export class Router {
    private handlers: Handlers;

    constructor(handlers: Handlers) {
        this.handlers = handlers;
    }

    public async handleRequest(req: IncomingMessage, res: ServerResponse) {
        const { url, method } = req;

        if (url?.startsWith(SendMessageHandler.path) && method === SendMessageHandler.method) {
            await this.handlers.sendMessageHandler.handle(req, res);
        } else if (url === "/start" && method === "GET") {
            await this.handlers.handleStart(res);
        } else if (url === "/help" && method === "GET") {
            await this.handlers.handleHelp(res);
        } else {
            await this.handlers.handleUnknown(res);
        }
    }
}
