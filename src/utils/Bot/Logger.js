import chalk from "chalk";
import mkdirp from "mkdirp";
import fs from "fs";

export default (client) => {
    client.error = async (message, error) => {
        console.log(chalk.red(`! ${error.name} - ${error.message}`));
        if (message) {
            let date = new Date().toLocaleString();

            let pathFile = `./logs/errors/${message.guild.id}.log`;
            let lineerror = `Date: ${date}\nMessage: ${message.id}\nUser: ${message.author.id}\nContent: ${message.content}\nError: ${error.name} - ${error.message}\n---------------------------------------------\n`;

            await mkdirp("./logs/errors");
            fs.writeFileSync(pathFile, lineerror, {
                flag: "a+",
            });
        }
    };

    client.errMessageLog = function (message, err, errMsg = "") {
        message.channel.embed(
            message.client.embeds.error(`**Bir Hata Oluştu!\n\n${errMsg}**`)
        );

        message.client.error(message, err);
    };
};
