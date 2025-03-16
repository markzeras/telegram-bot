import { SendMessageHandler } from "~/Handler/SendMessageHandler";
import {Handlers} from "~/Handler/Handlers";
import {Context} from "~/Types/context";

export class Router {
    private handlers: Handlers;

    constructor(handlers: Handlers) {
        this.handlers = handlers;
    }

    public async handleRequest(ctx: Context) {
        const { req } = ctx;
        const { url, method } = req;

        if (url?.startsWith(SendMessageHandler.path) && method === SendMessageHandler.method) {
            await this.handlers.sendMessageHandler.handle(ctx);
        } else if (url === "/start" && method === "GET") {
            await this.handlers.handleStart(ctx);
        } else if (url === "/help" && method === "GET") {
            await this.handlers.handleHelp(ctx);
        } else {
            await this.handlers.handleUnknown(ctx);
        }
    }
}
