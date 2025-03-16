import { Bot } from "grammy";
import {Handlers} from "~/Handler/Handlers";
import {User} from "@grammyjs/types";

export class TelegramBot {
    private bot: Bot;

    constructor(token: string) {
        this.bot = new Bot(token);
    }

    public async start(): Promise<void> {
        try {
            await this.bot.start();
        } catch (error) {
            console.error("❌ Error starting Telegram bot:", error);
        }
    }

    public async sendMessage(user: User, message: string) {
        try {
            await this.bot.api.sendMessage(user.id, message);
            console.log("✅ Message sent to user:", user.first_name);
        } catch (error) {
            console.error("❌ Error sending message:", error);
        }
    }

    public async initMessageListener(handler: Handlers) {
        this.bot.command("start", async (ctx) => {
            await ctx.reply("Welcome! Use /help to see available commands.");
        });

        this.bot.command("help", async (ctx) => {
            await ctx.reply("Available commands:\n/start - Start the bot\n/help - Show help");
        });

        this.bot.on("message:text", async (ctx) => {
            await handler.receiveMessageHandler.handle(ctx);
        });
    }
}
