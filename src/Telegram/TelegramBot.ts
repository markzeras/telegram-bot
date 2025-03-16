import { Bot } from "grammy";
import {User} from "~/Types/user";

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
            await this.bot.api.sendMessage(user.telegramId, message);
            console.log("✅ Message sent to user:", user.name);
        } catch (error) {
            console.error("❌ Error sending message:", error);
        }
    }
}