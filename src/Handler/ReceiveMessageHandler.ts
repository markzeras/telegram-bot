import {MessageService} from "~/Service/MessageService";
import {Context} from "grammy";
import {User} from "@grammyjs/types";


export class ReceiveMessageHandler {
    private readonly messageService: MessageService;

    constructor(messageService: MessageService) {
        this.messageService = messageService;
    }

    public async handle(ctx: Context): Promise<void> {
        const userTelegram = ctx.from as User;
        if (!userTelegram) {
            await ctx.reply("❌ User not found.");
            return;
        }
        console.log("Received message from", JSON.stringify(userTelegram, null, 2));
        console.log("message", JSON.stringify(ctx.message?.text, null, 2));
        await this.messageService.receiveMessage(ctx, userTelegram);
    }
}
