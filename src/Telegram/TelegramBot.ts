import { Bot } from "grammy";

export class TelegramBot {
    private bot: Bot;

    constructor(token: string) {
        this.bot = new Bot(token);
    }

    public async start(): Promise<void> {
        try {
            await this.bot.start();
            console.log("✅ Telegram bot started successfully");
        } catch (error) {
            console.error("❌ Error starting Telegram bot:", error);
        }
    }

    public async sendMessage(userId: string, message: string) {
        try {
            await this.bot.api.sendMessage(userId, message);
            console.log("✅ Message sent to user:", userId);
        } catch (error) {
            console.error("❌ Error sending message:", error);
        }
    }
}