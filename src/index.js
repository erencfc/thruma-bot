import Discord from "discord.js";
import { readdirSync } from "fs";
import "dotenv/config";
import chalk from "chalk";

const client = new Discord.Client({
    intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"],
});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = readdirSync("./src/commands/");

readdirSync("./src/events/").forEach(async (file) => {
    const event = (await import(`./events/${file}`)).default;
    const eventName = file.split(".")[0];

    const log = `${chalk.green("[EVENT]")} ${chalk.yellow(eventName)}`;
    const errLog = `${chalk.red("[EVENT]")} ${chalk.yellow(eventName)}`;

    if (typeof event != "function") return console.log(errLog);
    console.log(log);

    event(client);
});

readdirSync("./src/commands/").forEach(async (category) => {
    readdirSync(`./src/commands/${category}`).forEach(async (file) => {
        const command = (await import(`./commands/${category}/${file}`))
            .default;
        const commandName = file.split(".")[0];

        const log = `${chalk.green("[COMMAND]")} ${chalk.yellow(commandName)}`;
        const errLog = `${chalk.red("[COMMAND]")} ${chalk.yellow(commandName)}`;

        if (!command?.run) return console.log(errLog);
        console.log(log);

        client.commands.set(commandName, command);
        command.settings.aliases.forEach((alias) => {
            client.aliases.set(alias, commandName);
        });
    });
});

// utils & helpers
readdirSync("./src/utils/").forEach((dir) => {
    readdirSync(`./src/utils/${dir}`).forEach(async (file) => {
        (await import(`./utils/${dir}/${file}`)).default(client);
        const utilName = file.split(".")[0];
        const log = `${chalk.green("[UTIL]")} ${chalk.yellow(utilName)}`;
        console.log(log);
    });
});

client.login(process.env.TOKEN);
