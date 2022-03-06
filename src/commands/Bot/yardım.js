import { MessageEmbed } from "discord.js";
import { readdir } from "fs";

export default {
    help: {
        name: "yardım",
        description: "Yardım menüsünü açar.",
        usage: "yardım [komut/kategori]",
        category: "Bot",
    },
    settings: {
        enabled: true,
        onlyOwner: false,
        perm: [],
        aliases: ["help", "yardim", "komutlar"],
    },
    run: async (client, message, args) => {
        let embed = new MessageEmbed()
            .setColor("BLUE")
            .setTimestamp()
            .setFooter({
                text: `Detaylı bilgi için \`yardım komut/kategori\``,
                iconURL: message.member.displayAvatarURL(),
            })
            // .setThumbnail(message.author.displayAvatarURL())
            .setTitle(`${client.user.username} Yardım Menüsü`);

        let categories = [...client.categories];
        categories.sort();

        if (!args[0]) {
            categories.forEach((category) => {
                if (category == "Developer") return;
                readdir(`./src/commands/${category}`, (err, files) => {
                    if (err) return console.error(err);
                    let cmds = files.map((f) => f.slice(0, f.length - 3));

                    embed.addField(
                        `**${category} Kategorisi (${cmds.length})**`,
                        `${cmds.map((c) => `\`${c}\``).join(" ")}\n\n`
                    );
                });
            });
        } else {
            let command = args[0];
            if (client.commands.has(command) || client.aliases.has(command)) {
                command =
                    client.commands.get(command) ||
                    client.commands.get(client.aliases.get(command));

                let aliases = command.settings.aliases.join(", ");
                let permsArr = command.settings.perm;
                let perms = [];
                permsArr.forEach((perm) => {
                    perm = perm.replace("KICK_MEMBERS", "ÜYELERİ AT");
                    perm = perm.replace("BAN_MEMBERS", "ÜYELERİ ENGELLE");
                    perm = perm.replace("ADMINISTRATOR", "YÖNETİCİ");
                    perm = perm.replace("MANAGE_GUILD", "SUNUCUYU YÖNET");
                    perm = perm.replace("MANAGE_CHANNELS", "KANALLARI YÖNET");
                    perm = perm.replace("MANAGE_MESSAGES", "MESAJLARI YÖNET");
                    perm = perm.replace("MUTE_MEMBERS", "ÜYELERİ SUSTUR");
                    perm = perm.replace(
                        "DEAFEN_MEMBERS",
                        "ÜYELERİ SAĞIRLAŞTIR"
                    );
                    perm = perm.replace("MOVE_MEMBERS", "ÜYELERİ TAŞI");
                    perm = perm.replace(
                        "MANAGE_NICKNAMES",
                        "KULLANICI ADLARINI YÖNET"
                    );
                    perm = perm.replace("MANAGE_ROLES", "ROLLERİ YÖNET");

                    perms.push(perm);
                });
                embed.setTitle(
                    `${client.helpers.firstCaseUpper(command.help.name)} Komutu`
                );
                embed.setFields([
                    {
                        name: "Aktif",
                        value: `${command.settings.enabled ? "Evet" : "Hayır"}`,
                        inline: true,
                    },
                    {
                        name: "Sadece Sahip",
                        value: `${
                            command.settings.onlyOwner ? "Evet" : "Hayır"
                        }`,
                        inline: true,
                    },
                    {
                        name: "Gerekli Yetki",
                        value: `${
                            !perms ? "Yok" : `\`${perms.join(" ve ")}\``
                        }`,
                        inline: true,
                    },
                    {
                        name: "\u200b",
                        value: "\u200b",
                    },
                    {
                        name: `Kategori`,
                        value: `\`${command.help.category}\``,
                    },
                    {
                        name: "Açıklama",
                        value: `\`${command.help.description}\``,
                    },
                    {
                        name: "Kullanım",
                        value: `\`${command.help.usage}\``,
                    },
                    {
                        name: "Alternatif Kullanımlar",
                        value: `\`${!aliases ? "Yok" : aliases}\``,
                    },
                ]);
            } else if (
                categories.includes(client.helpers.firstCaseUpper(args[0]))
            ) {
                let category = client.helpers.firstCaseUpper(args[0]);
                readdir(`./src/commands/${category}`, (err, files) => {
                    if (err) return console.error(err);
                    let cmds = files.map((f) => f.slice(0, f.length - 3));

                    embed.addField(
                        `__${category}__ Kategorisinin Komutları (${cmds.length})`,
                        `${cmds.map((c) => `\`${c}\``).join(" ")}`
                    );

                    embed.addField("\u200b", "\u200b");

                    cmds.forEach((cmd) => {
                        let command = client.commands.get(cmd);

                        embed.addField(
                            `**${command.help.name}**`,
                            `\`${command.help.description}\`\n\n`
                        );
                    });
                });
            } else {
                embed.setTitle("Hata!");
                embed.setDescription(
                    `**\`${command}\` adında bir komut veya kategori bulunamadı.**`
                );
                embed.setColor("RED");
            }
        }
        await client.helpers.sleep(500);
        message.channel.embed(embed);
    },
};
