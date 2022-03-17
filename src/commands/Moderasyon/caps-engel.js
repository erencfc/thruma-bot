export default {
    help: {
        name: "caps-engel",
        description: "Büyük harf engelleme sistemini ayarlar.",
        usage: "caps-engel <aç/kapat>",
        category: "Moderasyon",
    },
    settings: {
        enabled: true,
        onlyOwner: false,
        perm: ["MANAGE_MESSAGES"],
        aliases: ["capsengel", "caps"],
    },
    run: async (client, message, args) => {
        let keys = ["aç", "kapat"];
        let key = args[0]?.toLowerCase();

        let status = await client.mongoose.getActive(message.guild, "caps");

        if (!keys.includes(key))
            return message.channel.embed(
                client.embeds.info(
                    `**Caps Engeli: \`${status ? "Aktif" : "Aktif değil"}!\`**`
                )
            );

        if (key === "aç") {
            if (status)
                return message.channel.embed(
                    client.embeds.info(`**Caps Engeli: \`Aktif!\`**`)
                );
            await client.mongoose.setActive(message.guild, "caps", true);
            return message.channel.embed(
                client.embeds.success(`**Caps Engeli: \`Aktif!\`**`)
            );
        } else if (key === "kapat") {
            if (!status)
                return message.channel.embed(
                    client.embeds.info(`**Caps Engeli: \`Aktif değil!\`**`)
                );
            await client.mongoose.setActive(message.guild, "caps", false);
            return message.channel.embed(
                client.embeds.success(`**Caps Engeli: \`Aktif değil!\`**`)
            );
        }
    },
};
