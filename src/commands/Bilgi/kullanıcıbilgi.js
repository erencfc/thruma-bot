export default {
    help: {
        name: "kullanıcıbilgi",
        description: "Kullanıcının bilgilerini gösterir.",
        usage: "kullanıcıbilgi [kullanıcı]",
        category: "Bilgi",
    },
    settings: {
        enabled: true,
        onlyOwner: false,
        perm: [],
        aliases: ["userinfo"],
    },
    run: async (client, message, args) => {
        await message.guild.members.fetch();
        const member = await client.member.getMemberById(args[0], message);
        if (!member) return client.noMember(message);

        const permissions = member.permissions.toArray().map((p) =>
            p
                .toLowerCase()
                .replace(/_/g, " ")
                .replace(/\w\S*/g, (txt) => {
                    return (
                        txt.charAt(0).toUpperCase() +
                        txt.substr(1).toLowerCase()
                    );
                })
        );

        const roles = member.roles.cache
            .filter((r) => r.name != "@everyone")
            .map((r) => r.name)
            .join(", ");

        let joinPosition;
        const members = message.guild.members.cache;
        members.sort((a, b) => a.joinedAt - b.joinedAt);
        for (let i = 0; i < members.size; i++) {
            if (members.toJSON()[i].id == member.id) joinPosition = i;
        }

        const embed = client
            .embed(
                null,
                `${member.user.tag} (${member.id})`,
                `${member.displayName}`,
                member
            )
            .setFields(
                {
                    name: "Hesap Oluşturma Tarihi",
                    value: member.user.createdAt.toLocaleString(),
                },
                {
                    name: "Sunucuya Katılma Tarihi",
                    value: member.joinedAt.toLocaleString(),
                },
                {
                    name: "Sunucudaki Üye Sırası",
                    value: `${joinPosition + 1} / ${members.size}`,
                },
                {
                    name: "Yetkiler",
                    value: permissions.join(", "),
                },
                {
                    name: "Roller",
                    value: roles ? roles : "Yok",
                }
            )
            .setFooter({ text: `ID: ${member.id}` });
        message.channel.embed(embed);
    },
};
