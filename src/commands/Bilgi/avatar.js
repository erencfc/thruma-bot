import { MessageEmbed } from "discord.js";

export default {
    help: {
        name: "avatar",
        description: "Kullanıcının avatarını gösterir.",
        usage: "avatar [kullanıcı]",
    },
    settings: {
        enabled: true,
        onlyOwner: false,
        perm: [],
        aliases: [],
    },
    run: async (client, message, args) => {
        const member = await client.member.getMemberById(args[0], message);

        if (!member) {
            return message.channel.embed(
                client.embeds.error(`**Böyle bir kullanıcı yok!**`)
            );
        }

        const avatar = member.displayAvatarURL({ size: 2048, dynamic: true });

        const embed = new MessageEmbed()
            .setColor("ORANGE")
            .setAuthor({
                name: `${member.user.tag} (${member.id})`,
                iconURL: avatar,
            })
            .setImage(avatar);

        message.channel.embed(embed);
    },
};
