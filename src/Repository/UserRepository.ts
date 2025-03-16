import {User} from "~/Types/user";
import userData from "users.json";

export class UserRepository {
  public async create(telegramId: number, name: string): Promise<void> {
    const users = await this.getAll();
    const user = users.find(user => user.telegramId === telegramId);
    if (!user) {
      users.push({telegramId, name});
      // await this.save(users);
    }
  }

  public async findByTelegramId(telegramId: number[]): Promise<User[]> {
    const users = await this.getAll();
    return users.filter(user => telegramId.includes(user.telegramId));
  }

  public async findByName(name: string[]): Promise<User[]> {
    const users = await this.getAll();
    return users.filter(user => name.includes(user.name));
  }

  public async getAll(): Promise<User[]> {
      return userData.users as User[];
  }
}