import userData from "users.json";
import {User} from "@grammyjs/types";

export class UserRepository {
  public async create(user: User): Promise<void> {
    const allUsers = await this.getAll();
    const userQuery = allUsers.find(u => u.id === user.id);
    if (!userQuery) {
      allUsers.push(user);
      // await this.save(users);
    }
  }

  public async findByTelegramId(id: number[]): Promise<User[]> {
    const users = await this.getAll();
    return users.filter(user => id.includes(user.id));
  }

  public async findByName(name: string[]): Promise<User[]> {
    const users = await this.getAll();
    return users.filter(user => name.includes(user.first_name));
  }

  public async getAll(): Promise<User[]> {
      return userData.users as User[];
  }
}