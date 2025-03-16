import {TelegramBot} from "~/Telegram/TelegramBot";
import {EnvVarsHelper} from "~/Helper/EnvVarsHelper";
import {Context} from "~/Types/context";


export class SendMessageHandler {
    public static readonly path = "/send-message";
    public static readonly method = "GET";

    private telegramBot: TelegramBot;
    private envVarsHelper: EnvVarsHelper;

    constructor(telegramBot: TelegramBot, envVarsHelper: EnvVarsHelper) {
        this.telegramBot = telegramBot;
        this.envVarsHelper = envVarsHelper;
    }

    public async handle(ctx: Context): Promise<void> {
        const {req, res} = ctx;
        const urlParams = new URL(req.url as string, `http://localhost:4000`);
        const text = urlParams.searchParams.get("text");

        if (!text) {
            res.writeHead(400);
            res.end("❌ Missing 'text' query parameter.");
            return;
        }

        await this.telegramBot.sendMessage(this.envVarsHelper.markUserId, text);

        res.writeHead(200);
        res.end("✅ Message sent!");
    }
}
// Extract message from query parameters (e.g., /send-message?text=Hello)
