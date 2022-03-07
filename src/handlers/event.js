import chalk from "chalk";
import { readdirSync } from "fs";

export default (client) => {
    readdirSync("./src/events/").forEach(async (file) => {
        const event = (await import(`../events/${file}`)).default;
        const eventName = file.split(".")[0];

        const log = `${chalk.green("[EVENT]")} ${chalk.yellow(eventName)}`;
        const errLog = `${chalk.red("[EVENT]")} ${chalk.yellow(eventName)}`;

        if (typeof event != "function") return console.log(errLog);
        console.log(log);

        event(client);
    });
};
