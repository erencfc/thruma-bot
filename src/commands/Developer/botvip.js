import ms from "ms";

export default {
    help: {
        name: "botvip",
        description: "VIP ayarlar.",
        usage: "botvip <ver/al> <id> [süre]",
        category: "Developer",
    },
    settings: {
        enabled: true,
        onlyOwner: true,
        perm: [],
        aliases: [],
    },
    run: async (client, message, args) => {
        let key = args[0]?.toLowerCase();

        if (key == "ver") {
            let expireAt = null;
            if (args[2]) {
                if (isNaN(ms(args[2])))
                    return message.channel.embed(
                        client.embeds.error(`**Geçerli bir süre gir!**`)
                    );

                let date = new Date();
                expireAt = new Date(
                    date.setMilliseconds(date.getMilliseconds() + ms(args[2]))
                );
            }

            client.mongoose.setVip(args[1], expireAt).then((vip) => {
                message.channel.embed(
                    client.embeds.success(
                        `**Başarıyla VIP olarak ayarlandı!\n\nVIP bitiş tarihi: \`${
                            vip.expireAt
                                ? new Date(vip.expireAt).toLocaleString()
                                : "sınırsız"
                        }\`**`
                    )
                );
            });
        } else if (key == "al") {
            mongoose.removeVip(args[1]).then(() => {
                message.channel.embed(
                    client.embeds.success(`**Başarıyla VIP kaldırıldı!**`)
                );
            });
        } else if (key == "ekle") {
            if (args[2] && isNaN(ms(args[2]))) {
                return message.channel.embed(
                    client.embeds.error(`**Geçerli bir süre gir!**`)
                );
            }
            if (!args[2]) {
                return message.channel.embed(
                    client.embeds.error(`**Süre gir!**`)
                );
            }

            let vip = await client.mongoose.checkVip(args[1]);
            if (!vip)
                return message.channel.embed(
                    client.embeds.error(`**Bu sunucu zaten VIP değil!**`)
                );

            if (!vip.expireAt)
                return message.channel.embed(
                    client.embeds.error(`**Bu sunucu sınırsız VIP!**`)
                );

            let oldExpireAt = new Date(vip.expireAt);
            let newExpireAt = new Date(
                oldExpireAt.setMilliseconds(
                    oldExpireAt.getMilliseconds() + ms(args[2])
                )
            );

            client.mongoose.setVip(args[1], newExpireAt).then((vip) => {
                message.channel.embed(
                    client.embeds.success(
                        `**Başarıyla \`${client.helpers.pretty(
                            ms(args[2])
                        )}\` eklendi.\n\nVIP bitiş tarihi: \`${
                            vip.expireAt
                                ? new Date(vip.expireAt).toLocaleString()
                                : "sınırsız"
                        }\`**`
                    )
                );
            });
        } else if (key == "çıkar" || key == "çıkart") {
            if (args[2] && isNaN(ms(args[2]))) {
                return message.channel.embed(
                    client.embeds.error(`**Geçerli bir süre gir!**`)
                );
            }
            if (!args[2]) {
                return message.channel.embed(
                    client.embeds.error(`**Süre gir!**`)
                );
            }

            let vip = await client.mongoose.checkVip(args[1]);
            if (!vip)
                return message.channel.embed(
                    client.embeds.error(`**Bu sunucu zaten VIP değil!**`)
                );

            if (!vip.expireAt)
                return message.channel.embed(
                    client.embeds.error(`**Bu sunucu sınırsız VIP!**`)
                );

            let oldExpireAt = new Date(vip.expireAt);
            let newExpireAt = new Date(
                oldExpireAt.setMilliseconds(
                    oldExpireAt.getMilliseconds() - ms(args[2])
                )
            );

            client.mongoose.setVip(args[1], newExpireAt).then((vip) => {
                message.channel.embed(
                    client.embeds.info(
                        `**Başarıyla \`${client.helpers.pretty(
                            ms(args[2])
                        )}\` çıkartıldı.\n\nVIP bitiş tarihi: \`${
                            vip.expireAt
                                ? new Date(vip.expireAt).toLocaleString()
                                : "sınırsız"
                        }\`**`
                    )
                );
            });
        }
    },
};
