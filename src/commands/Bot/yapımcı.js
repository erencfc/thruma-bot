export default {
    help: {
        name: "yapımcı",
        description: "Botun yapımcısını gösterir.",
        usage: "yapımcı",
        category: "Bot",
    },
    settings: {
        enabled: true,
        onlyOwner: false,
        perm: [],
        aliases: ["developer", "yapimci", "dev", "sahip", "sahibim"],
    },
    run: async (client, message, args, bot) => {
        const user = await client.users.fetch(bot.owner);

        message.channel.embed(
            client.embeds.random(
                `**Botun yapımcısı: <@${user?.id}> (${bot.owner})**`,
                user ? user : null
            )
        );
    },
};
