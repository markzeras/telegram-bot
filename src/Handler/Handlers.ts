import {SendMessageHandler} from "~/Handler/SendMessageHandler";
import {Context} from "~/Types/context";
import {Service} from "~/Service/Service";

export class Handlers {
    public readonly sendMessageHandler: SendMessageHandler;

    constructor(service: Service) {
        this.sendMessageHandler = new SendMessageHandler(service.userService);
    }

    public async handleStart(ctx: Context): Promise<void> {
        const {res} = ctx;
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello! I'm a bot that helps you manage your shops and organisations.");
    }

    public async handleHelp(ctx: Context) {
        const {res} = ctx;
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Here are the commands you can use:\n/start - Start the bot\n/help - Show this help message");
    }

    public async handleUnknown(ctx: Context) {
        const {res} = ctx;
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Sorry, I didn't understand that command. Type /help to see the list of available commands.");
    }
}
