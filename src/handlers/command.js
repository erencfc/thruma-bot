import chalk from "chalk";
import { readdirSync } from "fs";

export default (client) => {
    readdirSync("./src/commands/").forEach(async (category) => {
        readdirSync(`./src/commands/${category}`).forEach(async (file) => {
            const command = (
                await import(`../../src/commands/${category}/${file}`)
            ).default;
            const commandName = file.split(".")[0];

            const log = `${chalk.green("[COMMAND]")} ${chalk.yellow(
                commandName
            )}`;
            const errLog = `${chalk.red("[COMMAND]")} ${chalk.yellow(
                commandName
            )}`;

            if (!command?.run) return console.log(errLog);
            console.log(log);

            client.commands.set(commandName, command);
            command.settings.aliases.forEach((alias) => {
                client.aliases.set(alias, commandName);
            });
        });
    });
};
