import {UserRepository} from "~/Repository/UserRepository";
import {TelegramBot} from "~/Telegram/TelegramBot";
import {Context} from "grammy";
import {User} from "@grammyjs/types";

export class MessageService {
    private userRepository: UserRepository;
    private telegramBot: TelegramBot;

    constructor(userRepository: UserRepository, telegramBot: TelegramBot) {
        this.userRepository = userRepository;
        this.telegramBot = telegramBot;
    }

    public async sendMessage(userIds: number[], msg: string): Promise<void> {
        const users = await this.userRepository.findByTelegramId(userIds);
        if (users.length === 0) {
            console.log("❌ No users found with the provided IDs.");
            return;
        }
        for (const user of users) {
            try {
                await this.telegramBot.sendMessage(user, msg);
            } catch (error) {
                console.error("❌ Error sending message:", error);
            }
        }
    }

    public async receiveMessage(ctx: Context, userTelegram: User): Promise<void> {
        const users = await this.userRepository.findByTelegramId([userTelegram.id]);
        if (users.length === 0) {
            const unknownUserReplies = [
                `I think I don't know you yet. Nice to meet you, ${userTelegram.first_name}!`,
                `Hey ${userTelegram.first_name}, I don’t think we’ve met before. Welcome! 🎉`,
                `Hello, ${userTelegram.first_name}! I don't recognize you, but I'm happy to chat!`,
                `New face detected! Nice to meet you, ${userTelegram.first_name}. Let's talk!`
            ];

            const randomReply = unknownUserReplies[Math.floor(Math.random() * unknownUserReplies.length)];
            await ctx.reply(randomReply);
            return;
        }

        const user = users[0];
        const upliftingReplies = [
            `Hey ${user.first_name}, hope you're having an amazing day! ☀️`,
            `Nice to see you again, ${user.first_name}! You're awesome. 💙`,
            `Yo ${user.first_name}! Just a reminder that you're doing great. 💪`,
            `Hello ${user.first_name}, sending you some good vibes today! ✨`,
            `Glad to hear from you, ${user.first_name!} 😊 Keep being awesome!`,
            `Hey ${user.first_name}, whatever you're up to, I hope it's going amazing! 🚀`,
            `You got this, ${user.first_name}! Keep shining. 🌟`,
            `Hey ${user.first_name}, I appreciate you! Hope you’re doing well! 🙌`
        ];

        const randomReply = upliftingReplies[Math.floor(Math.random() * upliftingReplies.length)];
        await ctx.reply(randomReply);
    }


    public async getUserByTelegramId(telegramId: number): Promise<User[]> {
        return await this.userRepository.findByTelegramId([telegramId]);
    }

    public async getUserByName(name: string): Promise<User[]> {
        return await this.userRepository.findByName([name]);
    }

    public async getAllUsers(): Promise<User[]> {
        return await this.userRepository.getAll();
    }
}
