import Discord from "discord.js";
import bot from "../../config/bot.js";

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {string[]} args
 */

export default {
    help: {
        name: "botinfo",
        description: "Botun bilgilerini gösterir.",
        usage: "botinfo",
    },
    settings: {
        enabled: true,
        onlyOwner: false,
        perm: [],
        aliases: ["botbilgi"],
    },
    run: async (client, message, args) => {
        let totalSeconds = client.uptime / 1000;
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`;

        let user = await client.users.fetch(bot.owner);

        message.channel.embed(
            client.embeds.random(
                `**Botun İsmi: \`${client.user.username}\`\n\nBotun Sürümü: \`${
                    bot.version
                }\`\n\nBotun Sahibi: <@${user.id}> (${
                    user.tag
                })\n\nBotun Prefixi: \`${
                    bot.prefix
                }\`\n\nBotun Açık Kalma Süresi: \`${uptime}\`\n\nBotun Kuruluş Tarihi: \`${client.user.createdAt.toLocaleDateString()}\`\n\nSunucu Sayısı: \`${
                    client.guilds.cache.size
                }\`\n\nKanal Sayısı: \`${
                    client.channels.cache.size
                }\`\n\nÜye Sayısı: \`${client.users.cache.size}\`**`
            )
        );
    },
};
