import Lock from "../../models/Lock.js";

export default {
    help: {
        name: "kilit-kaldır",
        description: "Kanalın kilidini kaldırır.",
        usage: "kilit-kaldır",
        category: "Yetkili",
    },
    settings: {
        enabled: true,
        onlyOwner: false,
        perm: ["MANAGE_CHANNELS"],
        aliases: ["unlock"],
    },
    run: async (client, message, args) => {
        let clientMember = message.guild.me;

        if (!clientMember.permissions.has("MANAGE_CHANNELS"))
            return message.channel.embed(
                client.embeds.error(
                    "**Bu komutu kullanabilmek için bana `Kanalları Yönet` yetkisi vermelisiniz.**"
                )
            );

        try {
            await message.channel.permissionOverwrites.edit(
                message.guild.roles.everyone,
                {
                    SEND_MESSAGES: null,
                }
            );

            await Lock.deleteOne({ channelID: message.channel.id });
        } catch (error) {
            return client.errMessageLog(
                message,
                error,
                `Kanalın kilidi kaldırılamadı!`
            );
        }

        message.channel.embed(
            client.embeds.info(
                `**Bu kanalın kilidi ${message.member} adlı yetkili tarafından kaldırılmıştır!**`
            )
        );
    },
};
