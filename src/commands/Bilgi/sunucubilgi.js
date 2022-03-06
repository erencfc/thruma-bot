export default {
    help: {
        name: "sunucubilgi",
        description: "Sunucunun bilgilerini gösterir.",
        usage: "sunucubilgi",
    },
    settings: {
        enabled: true,
        onlyOwner: false,
        perm: [],
        aliases: ["serverinfo"],
    },
    run: async (client, message, args) => {
        await message.guild.members.fetch();
        await message.guild.channels.fetch();
        await message.guild.roles.fetch();
        let owner = (
            await client.member.getMemberById(message.guild.ownerId, message)
        ).user.tag;

        let channelCount = message.guild.channels.cache.size;
        let memberCount = message.guild.members.cache.filter(
            (member) => !member.user.bot
        ).size;
        let botCount = message.guild.members.cache.filter(
            (member) => member.user.bot
        ).size;
        let roleCount = message.guild.roles.cache.size;

        const embed = client
            .embed(null, null, message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .addField("Sunucu Sahibi", `${owner} (${message.guild.ownerId})`)
            .addField(
                "Kuruluş Tarihi",
                message.guild.createdAt.toLocaleString()
            )
            .addField("Kanal Sayısı", `${channelCount}`)
            .addField("Üye Sayısı", `${memberCount}`)
            .addField("Bot Sayısı", `${botCount}`)
            .addField("Rol Sayısı", `${roleCount}`)
            .setFooter({
                text: `ID: ${message.guild.id}`,
                iconURL: message.guild.iconURL(),
            });
        return message.channel.embed(embed);
    },
};
