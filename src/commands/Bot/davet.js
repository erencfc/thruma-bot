export default {
    help: {
        name: "davet",
        description: "Botun davet linkini gönderir.",
        usage: "davet",
    },
    settings: {
        enabled: true,
        onlyOwner: false,
        perm: [],
        aliases: ["bot-davet", "botdavet"],
    },
    run: async (client, message, args) => {
        message.channel.embed(
            client.embeds.random(
                `**https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot**`
            )
        );
    },
};
