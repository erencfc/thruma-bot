import { MessageEmbed } from "discord.js";

export default {
    help: {
        name: "eval",
        description: "Eval",
        usage: "eval <code>",
        category: "Developer",
    },
    settings: {
        enabled: true,
        onlyOwner: true,
        perm: [],
        aliases: [],
    },
    run: async (client, message, args) => {
        let embedd = new MessageEmbed()
            .setAuthor({
                name: message.member.displayName,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
            })
            .setColor("#f48924");

        let code = args.join(" ");

        if (!code)
            return await message.reply({
                embeds: [embedd.setDescription(`Bir kod girmelisin.`)],
            });

        async function clean(text) {
            if (typeof text !== "string")
                text = (await import("util")).inspect(text, { depth: 0 });
            text = text
                .replace(/`/g, "`" + String.fromCharCode(8203))
                .replace(/@/g, "@" + String.fromCharCode(8203));
            return text;
        }

        try {
            var cleaned = await clean(await eval(code));
            var evaled = cleaned.replace(
                /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g,
                "-TOKEN-"
            );

            if (evaled.length > 2000) {
                let attach = new MessageAttachment(
                    Buffer.from(
                        `Çıktı çok uzun olduğu için dosya olarak atıyorum.\n\nGiriş: ${code}\nÇıkış: ${evaled.replace(
                            /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g,
                            "-TOKEN-"
                        )}`,
                        "utf-8"
                    ),
                    "eval.js"
                );

                return await message.reply({ files: [attach] });
            } else {
                return await message.reply({
                    embeds: [
                        embedd.setDescription(
                            `**Giriş:** \`\`\`js\n${code}\`\`\`\n**Çıkış:** \`\`\`js\n${evaled.replace(
                                /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g,
                                "-TOKEN-"
                            )}\`\`\``
                        ),
                    ],
                });
            }
        } catch (err) {
            return await message.reply({
                embeds: [
                    embedd
                        .setDescription(`**Hata:** \`\`\`js\n${err}\`\`\``)
                        .setColor("RED"),
                ],
            });
        }
    },
};
