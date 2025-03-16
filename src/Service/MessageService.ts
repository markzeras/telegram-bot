import {UserRepository} from "~/Repository/UserRepository";
import {User} from "~/Types/user";
import {TelegramBot} from "~/Telegram/TelegramBot";

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
