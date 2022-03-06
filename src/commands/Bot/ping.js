export default {
    help: {
        name: "ping",
        description: "Botun pingini gösterir.",
        usage: "ping",
        category: "Bot",
    },
    settings: {
        enabled: true,
        onlyOwner: false,
        perm: [],
        aliases: [],
    },
    run: async (client, message) => {
        message.channel
            .embed(client.embeds.info("Hesaplanıyor..."))
            .then((m) => {
                let botLatency = m.createdTimestamp - message.createdTimestamp;
                let apiLatency = Math.round(client.ws.ping);

                m.editEmbed(
                    client.embeds.info(
                        `**Bot Gecikmesi:** \`${botLatency}ms\`
                        
                        **Discord API Gecikmesi:** \`${apiLatency}ms\``
                    )
                );
            });
    },
};
