import { readFile, writeFile } from "fs";

export default {
    help: {
        name: "changelog",
        description: "Changelog gönderir.",
        usage: "changelog <sürüm> <değişiklikler>",
        category: "Developer",
    },
    settings: {
        enabled: true,
        onlyOwner: true,
        perm: [],
        aliases: [],
    },
    run: async (client, message, args) => {
        let version = args[0];
        let changelog = args.slice(1).join(" ");

        if (!version) {
            return message.channel.embed(
                client.embeds.error(
                    `**Versiyonu girmelisin!\n\`${this.help.usage}\`**`
                )
            );
        }

        if (!changelog) {
            return message.channel.embed(
                client.embeds.error(
                    `**Değişiklikleri girmelisin!\n\`${this.help.usage}\`**`
                )
            );
        }

        readFile("./src/config/bot.js", "utf8", async (err, data) => {
            if (err) {
                return console.log(err);
            }

            data = data.replace(/(?<=version: ")(.*)(?=")/, version);

            writeFile("./src/config/bot.js", data, (err) => {
                if (err) {
                    return console.log(err);
                }
            });

            readFile("./src/config/changelog.js", "utf8", async (err, data) => {
                if (err) {
                    return console.log(err);
                }

                let changelogs = (await import("../../config/changelog.js"))
                    .changelogs;

                changelogs.push({ [version]: changelog });

                writeFile(
                    "./src/config/changelog.js",
                    `export const changelogs = ${JSON.stringify(
                        changelogs,
                        null,
                        4
                    )}`,
                    (err) => {
                        if (err) {
                            return console.log(err);
                        }
                    }
                );

                await client.channels
                    .fetch(client.settings.channels.changelog)
                    .then((channel) => {
                        channel.embed(
                            client.embeds
                                .info(`${changelog}`, message.guild.me)
                                .setTitle(`**${version}** - Değişiklikler`)
                        );
                    });

                return client.success(
                    message,
                    "Sürümü ve değişiklikleri güncelledim!"
                );
            });
        });
    },
};
