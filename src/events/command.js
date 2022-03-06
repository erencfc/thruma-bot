import bot from "../config/bot.js";
const cooldown = new Set();

export default (client) => {
    client.on("messageCreate", (message) => {
        if (
            message.author.bot ||
            !message.guild ||
            !message.content.startsWith(bot.prefix)
        )
            return;

        if (cooldown.has(message.author.id)) {
            return message.channel.send(
                "**Komutları çok hızlı kullanıyorsun!**"
            );
        }

        let command = message.content.split(" ")[0].slice(bot.prefix.length);
        let args = message.content.split(" ").slice(1);

        let cmd;

        if (client.commands.has(command)) cmd = client.commands.get(command);
        else if (client.aliases.has(command))
            cmd = client.commands.get(client.aliases.get(command));

        if (!cmd) return;

        let permsArr = cmd.settings.perm;
        let perms = [];
        permsArr.forEach((perm) => {
            perm = perm.replace("KICK_MEMBERS", "ÜYELERİ AT");
            perm = perm.replace("BAN_MEMBERS", "ÜYELERİ ENGELLE");
            perm = perm.replace("ADMINISTRATOR", "YÖNETİCİ");
            perm = perm.replace("MANAGE_GUILD", "SUNUCUYU YÖNET");
            perm = perm.replace("MANAGE_CHANNELS", "KANALLARI YÖNET");
            perm = perm.replace("MANAGE_MESSAGES", "MESAJLARI YÖNET");
            perm = perm.replace("MUTE_MEMBERS", "ÜYELERİ SUSTUR");
            perm = perm.replace("DEAFEN_MEMBERS", "ÜYELERİ SAĞIRLAŞTIR");
            perm = perm.replace("MOVE_MEMBERS", "ÜYELERİ TAŞI");
            perm = perm.replace("MANAGE_NICKNAMES", "KULLANICI ADLARINI YÖNET");
            perm = perm.replace("MANAGE_ROLES", "ROLLERİ YÖNET");

            perms.push(perm);
        });

        cooldown.add(message.author.id);

        setTimeout(() => {
            cooldown.delete(message.author.id);
        }, 1500);

        return new Promise((resolve, reject) => {
            if (message.author.id != bot.owner) {
                if (!cmd.settings.enabled)
                    reject(`:x: Bu komut geçici olarak devre dışı!`);

                if (cmd.settings.onlyOwner)
                    reject(`:x: Bu komutu sadece bot sahibi kullanabilir!`);

                if (
                    cmd.settings.perm != [] &&
                    !message.member.permissions.has(cmd.settings.perm)
                )
                    reject(
                        `:x: Bu komutu kullanmak için \`${perms.join(
                            " ve "
                        )}\` yetkisine sahip olmalısın!`
                    );
            }

            resolve(true);
        })
            .then(async () => {
                try {
                    await cmd.run(client, message, args);
                } catch (err) {
                    message.channel.send(
                        "Bu komutta bilinmeyen bir hata oluştu."
                    );
                    console.log(err);
                }
            })
            .catch((err) => {
                message.channel.send(`**${err}**`);
            });
    });
};
