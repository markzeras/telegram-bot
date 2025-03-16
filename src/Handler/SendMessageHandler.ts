import {HttpContext} from "~/Types/httpContext";
import {MessageService} from "~/Service/MessageService";


export class SendMessageHandler {
    public static readonly path = "/send-message";
    public static readonly method = "GET";

    private readonly messageService: MessageService;

    constructor(messageService: MessageService) {
        this.messageService = messageService;
    }

    public async handle(ctx: HttpContext): Promise<void> {
        const {req, res} = ctx;
        const urlParams = new URL(req.url as string, `http://localhost:4000`);
        const msgQueryString = urlParams.searchParams.get("msg");
        const userIdQueryString = urlParams.searchParams.get("userId");

        if (!msgQueryString) {
            res.writeHead(400);
            res.end("❌ Missing 'msg' query parameter.");
            return;
        }

        if (!userIdQueryString) {
            res.writeHead(400);
            res.end("❌ Missing 'userId' query parameter.");
            return;
        }
        if (!/^\d+(,\s*\d+)*$/.test(userIdQueryString)) {
            res.writeHead(400);
            res.end("❌ Invalid 'userId' query parameter. Must be a comma-separated list of numbers.");
            return;
        }
        const userIds = userIdQueryString.split(",").map(id => parseInt(id.trim(), 10));

        await this.messageService.sendMessage(userIds, msgQueryString);

        res.writeHead(200);
        res.end("✅ Message sent!");
    }
}
