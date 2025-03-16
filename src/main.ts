import {Bot} from "grammy";
import {EnvVarsHelper} from './Helper/EnvVarsHelper';

// const result = dotenv.config()
const envVarsHelper: EnvVarsHelper = new EnvVarsHelper(process.env as Record<string, string>);
// Create a bot object

const bot = new Bot(envVarsHelper.botToken); // <-- place your bot token in this string

// Register listeners to handle messages
bot.on("message:text", (ctx) => ctx.reply("Echo: " + ctx.message.text));

// Start the bot (using long polling)
bot.start();

bot.api.sendMessage(envVarsHelper.markUserId, 'I wrote a Telegram bot!')