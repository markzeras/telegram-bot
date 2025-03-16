import readline from "readline";

export const initTerminal = async (bot: any, envVarsHelper: any) => {
    // Initialize the bot with the token from environment variables
    console.log("Bot initialized with token:", envVarsHelper.botToken);

    // Set up a readline interface to read input from the terminal
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Bot> "  // Shows a prompt in the terminal
    });

    console.log("Bot is running. Type a message to send it to Telegram:");

    rl.on("line", async (input) => {
        if (input.trim().toLowerCase() === "exit") {
            console.log("Exiting bot...");
            rl.close();
            process.exit(0);
        }

        await bot.api.sendMessage(envVarsHelper.markUserId, input);
        console.log("✅ Message sent!");
        rl.prompt();
    });

    rl.prompt();
}
