import chalk from "chalk";
import { readdirSync } from "fs";

export default (client) => {
    readdirSync("./src/utils/").forEach((dir) => {
        readdirSync(`./src/utils/${dir}`).forEach(async (file) => {
            (await import(`../utils/${dir}/${file}`)).default(client);
            const utilName = file.split(".")[0];
            const log = `${chalk.green("[UTIL]")} ${chalk.yellow(utilName)}`;
            console.log(log);
        });
    });
};
