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
        perm: "",
        aliases: [],
    },
    run: async (client, message, args) => {
        message.channel.send("Hesaplanıyor...").then((m) => {
            m.edit({
                embeds: [
                    client.embeds.info(
                        `**Mesaj Gecikmesi:** \`${
                            m.createdTimestamp - message.createdTimestamp
                        }ms\`
                        
                        **API Gecikmesi:** \`${Math.round(client.ws.ping)}ms\``
                    ),
                ],
            });
        });
    },
};
