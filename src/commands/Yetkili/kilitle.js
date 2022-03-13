import ms from "ms";
import Lock from "../../models/Lock.js";

export default {
    help: {
        name: "kilitle",
        description: "Kanalı kilitler.",
        usage: "kilitle [süre]",
        category: "Yetkili",
    },
    settings: {
        enabled: true,
        onlyOwner: false,
        perm: ["MANAGE_CHANNELS"],
        aliases: ["lock"],
    },
    run: async (client, message, args) => {
        let clientMember = message.guild.me;

        if (!clientMember.permissions.has("MANAGE_CHANNELS"))
            return message.channel.embed(
                client.embeds.error(
                    "**Bu komutu kullanabilmek için bana `Kanalları Yönet` yetkisi vermelisiniz.**"
                )
            );

        if (args[0] && isNaN(ms(args[0])))
            return message.channel.embed(
                client.embeds.error(
                    "**Lütfen geçerli bir süre giriniz. (Örnek: 10m, 10h)**"
                )
            );

        try {
            if (args[0] && !isNaN(ms(args[0]))) {
                const time = ms(args[0]);
                let dateNow = new Date();
                let expireAt = new Date(
                    dateNow.setMilliseconds(dateNow.getMilliseconds() + time)
                );

                await Lock.updateOne(
                    { channelID: message.channel.id },
                    { $set: { expireAt: expireAt } },
                    { new: true, upsert: true }
                );
            }

            await message.channel.permissionOverwrites.edit(
                message.guild.roles.everyone,
                {
                    SEND_MESSAGES: false,
                }
            );
        } catch (error) {
            return client.errMessageLog(message, error, `Kanal kilitlenemedi!`);
        }

        message.channel.embed(
            client.embeds.warning(
                `**Bu kanal ${
                    message.member
                } adlı yetkili tarafından kilitlenmiştir!\n\nKilit süresi: \`${
                    args[0] && !isNaN(ms(args[0]))
                        ? `${client.helpers.pretty(ms(args[0]))}`
                        : "SINIRSIZ"
                }\`**`
            )
        );
    },
};
