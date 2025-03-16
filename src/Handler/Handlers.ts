import {SendMessageHandler} from "~/Handler/SendMessageHandler";
import {HttpContext} from "~/Types/httpContext";
import {Service} from "~/Service/Service";
import {ReceiveMessageHandler} from "~/Handler/ReceiveMessageHandler";

export class Handlers {
    public readonly sendMessageHandler: SendMessageHandler;
    public readonly receiveMessageHandler: ReceiveMessageHandler;

    constructor(service: Service) {
        this.sendMessageHandler = new SendMessageHandler(service.userService);
        this.receiveMessageHandler = new ReceiveMessageHandler(service.userService);
    }

    public async handleStart(ctx: HttpContext): Promise<void> {
        const {res} = ctx;
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello! I'm a bot that helps you manage your shops and organisations.");
    }

    public async handleHelp(ctx: HttpContext) {
        const {res} = ctx;
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Here are the commands you can use:\n/start - Start the bot\n/help - Show this help message");
    }

    public async handleUnknown(ctx: HttpContext) {
        const {res} = ctx;
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Sorry, I didn't understand that command. Type /help to see the list of available commands.");
    }
}
