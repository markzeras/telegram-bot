import {MessageService} from "~/Service/MessageService";
import {Repository} from "~/Repository/Repository";
import {TelegramBot} from "~/Telegram/TelegramBot";

export class Service {
  public readonly userService: MessageService;

  constructor(repository: Repository, telegramBot: TelegramBot) {
    this.userService = new MessageService(repository.userRepository, telegramBot);
  }
}
