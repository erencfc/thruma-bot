const usage = "botpp <link veya resim>";

export default {
    help: {
        name: "botpp",
        description: "Botun profil fotoğrafını değiştirir.",
        usage,
        category: "Developer",
    },
    settings: {
        enabled: true,
        onlyOwner: true,
        perm: [],
        aliases: [],
    },
    run: async (client, message, args) => {
        let pp = args[0];

        if (!pp) {
            pp = message.attachments.first()?.attachment;
            if (!pp) return message.channel.send(usage);
        }

        client.user.setAvatar(pp);
        client.guilds.cache.get(client.settings.server).setIcon(pp);

        message.channel.send("Profil fotoğrafı değiştirildi.");
    },
};
