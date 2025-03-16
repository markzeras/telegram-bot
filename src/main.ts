import {EnvVarsHelper} from './Helper/EnvVarsHelper';
import {TelegramBot} from "~/Telegram/TelegramBot";
import {startServer} from "~/Server/Server";
import {Handlers} from "~/Handler/Handlers";
import {Router} from "~/Server/Router";
import {Service} from "~/Service/Service";
import {Repository} from "~/Repository/Repository";

const envVarsHelper: EnvVarsHelper = new EnvVarsHelper(process.env as Record<string, string>);
const telegramBot = new TelegramBot(envVarsHelper.botToken);
// initTerminal(telegramBot, envVarsHelper); // Uncomment this line to initialize the terminal interface
const repository = new Repository();
const service = new Service(repository, telegramBot);
const handlers =  new Handlers(service);
const router = new Router(handlers);

telegramBot.start();
startServer(envVarsHelper.port, router);
